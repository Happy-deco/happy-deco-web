import type { Config } from "@netlify/functions";

const owner="Happy-deco",repo="happy-deco-web",branch="main";
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json"}});
const github=async(path:string,token:string,init:RequestInit={})=>{const response=await fetch(`https://api.github.com${path}`,{...init,headers:{accept:"application/vnd.github+json",authorization:`Bearer ${token}`,"x-github-api-version":"2026-03-10",...init.headers}});if(!response.ok)throw new Error(`GitHub ${response.status}: ${await response.text()}`);return response.json()};
const blob=async(content:string,token:string,encoding:"base64"|"utf-8"="base64")=>(await github(`/repos/${owner}/${repo}/git/blobs`,token,{method:"POST",body:JSON.stringify({content,encoding})})).sha;

export default async(req:Request)=>{
 if(req.method!=="POST")return json({error:"Método no permitido"},405);
 const token=Netlify.env.get("HAPPY_DECO_GITHUB_TOKEN"),secret=Netlify.env.get("GALLERY_ADMIN_PASSWORD");
 if(!token||!secret)return json({error:"El panel todavía no está configurado"},503);
 try{
  const {password,title="",dataUrl}=await req.json();
  if(typeof password!=="string"||password!==secret)return json({error:"Contraseña incorrecta"},401);
  if(typeof dataUrl!=="string"||!dataUrl.startsWith("data:image/jpeg;base64,"))return json({error:"Formato de imagen no válido"},400);
  const image=dataUrl.split(",")[1];if(!image||image.length>5_200_000)return json({error:"La imagen es demasiado grande"},413);
  const stamp=new Date().toISOString().replace(/[-:.TZ]/g,"");const random=crypto.randomUUID().slice(0,8),name=`${stamp}-${random}.jpg`,publicPath=`/happy-deco-web/images/gallery/${name}`;
  const ref=await github(`/repos/${owner}/${repo}/git/ref/heads/${branch}`,token),head=ref.object.sha,commit=await github(`/repos/${owner}/${repo}/git/commits/${head}`,token);
  let items:any[]=[];try{const current=await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/gallery.json?${Date.now()}`);if(current.ok)items=await current.json()}catch{}
  items.unshift({src:publicPath,alt:title?`Ambientación ${title}`:"Ambientación realizada por Happy Deco",title:title||"Happy Deco",createdAt:new Date().toISOString()});
  const imageSha=await blob(image,token),gallerySha=await blob(JSON.stringify(items,null,2),token,"utf-8");
  const tree=await github(`/repos/${owner}/${repo}/git/trees`,token,{method:"POST",body:JSON.stringify({base_tree:commit.tree.sha,tree:[{path:`public/images/gallery/${name}`,mode:"100644",type:"blob",sha:imageSha},{path:`docs/images/gallery/${name}`,mode:"100644",type:"blob",sha:imageSha},{path:"public/gallery.json",mode:"100644",type:"blob",sha:gallerySha},{path:"docs/gallery.json",mode:"100644",type:"blob",sha:gallerySha}]})});
  const next=await github(`/repos/${owner}/${repo}/git/commits`,token,{method:"POST",body:JSON.stringify({message:`Agregar foto a la galería${title?`: ${title}`:""}`,tree:tree.sha,parents:[head]})});
  await github(`/repos/${owner}/${repo}/git/refs/heads/${branch}`,token,{method:"PATCH",body:JSON.stringify({sha:next.sha})});
  return json({ok:true,src:publicPath});
 }catch(error){console.error(error);return json({error:"No se pudo publicar la foto. Intentá nuevamente."},500)}
};
export const config:Config={path:"/api/gallery-upload",method:"POST"};
