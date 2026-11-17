// ATUALIZAÇÃO 16/11 — Autenticação SOMENTE DIDÁTICA.
// Senhas, diário e dados de proteção reais NÃO devem ser usados neste protótipo.
(function(){
"use strict";
const S="lia_demo_sessao_v1",P="lia_demo_resumo_senha_v1",D="lia_account_v1";
function json(t){try{return JSON.parse(t)}catch{return null}}
function resumo(s){let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return "demo-"+(h>>>0).toString(16)}
function atual(){const u=json(sessionStorage.getItem(S));return u&&typeof u.nome==="string"&&typeof u.email==="string"?u:null}
function sessao(u){const x={nome:u.nome,email:String(u.email).trim().toLowerCase()};sessionStorage.setItem(S,JSON.stringify(x));return x}
function registrar(nome,email,senha){
 nome=String(nome||"").trim();email=String(email||"").trim().toLowerCase();
 if(!nome||!email)throw Error("Preencha nome e e-mail.");
 const anterior=json(localStorage.getItem(D));
 const ativa=atual();
 if(!senha&&(!ativa||ativa.email!==email||!localStorage.getItem(P)||!anterior||String(anterior.email||"").trim().toLowerCase()!==email))throw Error("Crie uma senha fictícia com pelo menos seis caracteres.");
 if(senha&&senha.length<6)throw Error("A senha precisa ter ao menos seis caracteres.");
 if(senha)localStorage.setItem(P,resumo(senha));
 return sessao({nome,email});
}
async function listar(){
 if(location.protocol==="file:")return window.LIA_USUARIOS_DEMO||[];
 try{const r=await fetch("dados/usuarios.json",{cache:"no-store"});if(!r.ok)throw Error("JSON indisponível");
 const d=await r.json();return Array.isArray(d)?d:[]}
 catch(e){console.warn("JSON indisponível; lista didática auxiliar",e);return window.LIA_USUARIOS_DEMO||[]}
}
async function entrar(email,senha){
 email=String(email||"").trim().toLowerCase();senha=String(senha||"");
 const conta=json(localStorage.getItem(D)),hash=localStorage.getItem(P);
 if(conta&&String(conta.email||"").trim().toLowerCase()===email){
   if(hash&&resumo(senha)===hash)return sessao({nome:conta.name,email});
   throw Error("E-mail ou senha incorretos.");
 }
 const u=(await listar()).find(x=>String(x.email||"").toLowerCase()===email&&x.senha===senha);
 if(!u)throw Error("E-mail ou senha incorretos.");
 return sessao(u);
}
function sair(){sessionStorage.removeItem(S);location.href="index.html"}
function desenhar(){
 const usuario=atual();
 const menu=document.querySelector(".lia-controles-topo")||document.querySelector(".header-actions");
 document.querySelectorAll(".nav-account").forEach(a=>{if(usuario){a.textContent="Meu perfil";a.removeAttribute("data-i18n")}});
 if(!menu||menu.querySelector("[data-lia-demo-menu]"))return;
 const area=document.createElement("div");area.dataset.liaDemoMenu="";
 area.style.cssText="display:flex;align-items:center;gap:8px;flex-wrap:wrap;";
 if(usuario){
  const nome=document.createElement("a");nome.href="conta.html";nome.textContent="Olá, "+usuario.nome.split(/\s+/)[0];
  nome.style.cssText="color:#60457c;font-weight:bold;text-decoration:none;";
  const botao=document.createElement("button");botao.type="button";botao.textContent="Sair";
  botao.style.cssText="padding:8px 15px;border:1px solid #80619f;border-radius:20px;color:#60457c;background:white;cursor:pointer;";
  botao.addEventListener("click",sair);area.append(nome,botao);
 }else{
  const link=document.createElement("a");link.href="entrar.html";link.textContent="Entrar";
  link.style.cssText="padding:9px 17px;background:#80619f;border-radius:22px;color:white;text-decoration:none;";
  area.append(link);
 }
 menu.appendChild(area);
}
window.LIAAuthDemo={atual,entrar,registrar,sair,desenhar};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",desenhar);else desenhar();
})();
