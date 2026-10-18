/* Public showcase UI. No credentials or private repository data are used. */
const USER = 'ayoubodf-dev';
const projects = [
  {id:'jarvis',name:'JARVIS',category:'web',label:'AI & AUTOMATION',repo:'jarvis-showcase',stack:['React','FastAPI','Python'],description:'A local-first AI assistant connecting voice interaction, desktop automation, and mobile clients.',goal:'Bring voice, AI assistance, and everyday automation into a local-first workflow.',built:'A React interface and FastAPI services, with voice interaction, macOS automation, and Android clients.',focus:'Connecting multiple interfaces to a shared service while keeping the local-first approach visible in the product architecture.',visual:'window',tone:'#e3eee8'},
  {id:'locallink',name:'LocalLink',category:'mobile',label:'CROSS-PLATFORM · FILE SHARING',repo:'locallink-showcase',stack:['Flutter','Dart','Local network'],description:'Private file sharing between macOS and Android over a local network.',goal:'Make it practical to move files between desktop and phone without routing them through a public cloud.',built:'A cross-platform Flutter application designed for file sharing on a private local network.',focus:'Device-to-device workflows, clear transfer states, and a consistent experience across different screen sizes.',visual:'phone',tone:'#e7ecef'},
  {id:'venu',name:'Venu',category:'mobile',label:'REAL-TIME · SOCIAL',repo:'venu-showcase',stack:['React Native','Node.js','WebRTC'],description:'A location-aware social platform with real-time chat and calling.',goal:'Connect location-aware discovery with conversations that continue in real time.',built:'Mobile interfaces and Node.js services supporting chat and calls, using Socket.IO and WebRTC.',focus:'Coordinating live communication, mobile interaction, and service integrations within one product.',visual:'phone',tone:'#eeece5'},
  {id:'streamcatcher',name:'StreamCatcher',category:'tools',label:'DESKTOP · BROWSER INTEGRATION',repo:'streamcatcher-showcase',stack:['Electron','React','FFmpeg'],description:'A macOS download manager paired with a Chrome extension for direct media and unencrypted HLS.',goal:'Connect browser-discovered media with a dedicated desktop download workflow.',built:'An Electron application with a React interface, companion browser extension, and media processing tools.',focus:'The handoff between browser and desktop, understandable download states, and handling authorized media workflows.',visual:'window',tone:'#e7e9f1'},
  {id:'gmail',name:'Gmail Organizer',category:'web',label:'PRODUCTIVITY · EXTENSION',repo:'gmail-organizer-showcase',stack:['JavaScript','Chrome extension','Automation'],description:'An inbox productivity extension with organization workflows, analytics, and optional AI summaries.',goal:'Make recurring inbox organization easier to manage through focused productivity tools.',built:'A Chrome extension combining organization workflows, analytics, and optional AI-assisted summaries.',focus:'Working within an existing interface and keeping automation understandable to the person using it.',visual:'window',tone:'#e6eee9'},
  {id:'sc300',name:'Device Manager',category:'tools',label:'LOCAL NETWORK · ANDROID TV',repo:'sc300-remote-manager-showcase',stack:['Node.js','ADB','Tailscale'],description:'A private-network dashboard for managing Android TV devices and remote-control workflows.',goal:'Bring device administration and remote control into a practical private-network workspace.',built:'A Node.js dashboard integrating Android Debug Bridge, Tailscale, and scrcpy for device management.',focus:'Coordinating device state and control tools without presenting private device information in the public showcase.',visual:'command',tone:'#e9eeeb'},
];
const $ = s => document.querySelector(s);
const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let activeFilter='all';
function visual(p){
  const file={gmail:'gmail-organizer',sc300:'sc300-remote-manager'}[p.id]||p.id;
  return `<img class="project-image" src="docs/images/projects/${file}.png" alt="${escape(p.name)} interface preview from the public project showcase" loading="lazy" decoding="async" width="1440" height="960">`;
}
function render(){
  const query=$('#project-search').value.trim().toLowerCase();
  const visible=projects.filter(p=>(activeFilter==='all'||p.category===activeFilter)&&`${p.name} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(query));
$('#project-grid').innerHTML=visible.map(p=>`<article class="project-card"><button type="button" class="project-visual screenshot-preview" data-project="${p.id}" aria-label="View ${p.name} image and project details">${visual(p)}<span class="image-caption">View project ↗</span></button><div class="project-body"><div class="project-category">${p.label}</div><div class="project-title"><h3>${p.name}</h3><span aria-hidden="true">↗</span></div><p class="project-description">${p.description}</p><div class="project-tags">${p.stack.map(s=>`<span>${escape(s)}</span>`).join('')}</div><div class="project-footer"><button type="button" data-project="${p.id}">Project notes <span aria-hidden="true">↗</span></button><a href="https://github.com/${USER}/${p.repo}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} public showcase on GitHub">GitHub details ↗</a></div></div></article>`).join('')||'<div class="empty">No matching projects. Try a different technology or select All projects.</div>';
  $('#project-results').textContent=`${visible.length} of ${projects.length} projects · Public showcases; product source remains private.`;
}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});render();}));
$('#project-search').addEventListener('input',render);
let lastProjectButton;
$('#project-grid').addEventListener('click',event=>{
  const button=event.target.closest('[data-project]');if(!button)return;
  const p=projects.find(p=>p.id===button.dataset.project);lastProjectButton=button;
  $('#dialog-content').innerHTML=`<h2 id="dialog-title">${p.name}</h2><div class="dialog-image">${visual(p)}</div><p>${p.description}</p><div class="project-tags">${p.stack.map(s=>`<span>${escape(s)}</span>`).join('')}</div><h3>The goal</h3><p>${p.goal}</p><h3>What I built</h3><p>${p.built}</p><h3>Engineering focus</h3><p>${p.focus}</p><a class="button dark" href="https://github.com/${USER}/${p.repo}" target="_blank" rel="noopener noreferrer">Explore the public showcase ↗</a><p class="dialog-note">Preview image from the public project showcase. Visit GitHub for more documentation and demonstration media. Product source remains private.</p>`;
  $('#project-dialog').showModal();
});
$('#close-dialog').addEventListener('click',()=>$('#project-dialog').close());
$('#project-dialog').addEventListener('close',()=>lastProjectButton?.focus());
$('#project-dialog').addEventListener('click',event=>{if(event.target===$('#project-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.nav-item').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));});},{rootMargin:'-10% 0px -55% 0px',threshold:0});
['overview','projects','approach','services'].forEach(id=>navObserver.observe(document.getElementById(id)));
render();

const CACHE_KEY='ayoub-public-github-v2';
const TTL=15*60*1000;
function cachedData(){try{const data=JSON.parse(localStorage.getItem(CACHE_KEY));return data&&Array.isArray(data.repos)&&data.profile?data:null;}catch{return null;}}
function applyData(data,cached=false){
  const repos=data.repos.filter(r=>!r.fork&&!r.archived);
  $('#repo-count').textContent=String(data.profile.public_repos??data.repos.length);
  const languages=Object.entries(repos.reduce((acc,r)=>{if(r.language)acc[r.language]=(acc[r.language]||0)+1;return acc;},{})).sort((a,b)=>b[1]-a[1]);
  $('#language-count').textContent=String(languages.length);
  const latest=repos.map(r=>r.pushed_at).filter(d=>Number.isFinite(Date.parse(d))).sort().at(-1);
  $('#latest-push').textContent=latest?new Intl.DateTimeFormat('en',{day:'numeric',month:'short'}).format(new Date(latest)):'—';
  const time=new Intl.DateTimeFormat('en',{hour:'2-digit',minute:'2-digit'}).format(new Date(data.savedAt));
  $('#sync-note').textContent=`Last synced ${time}`;
  const total=languages.reduce((s,[,n])=>s+n,0);
  $('#languages').innerHTML=languages.slice(0,5).map(([name,count])=>`<div class="language-row"><span>${escape(name)}</span><div class="language-bar"><i style="width:${Math.round(count/total*100)}%"></i></div><span>${count} ${count===1?'repo':'repos'}</span></div>`).join('')||'<p class="muted">No language metadata available.</p>';
  const status=$('#api-status');status.className=`api-status ${cached?'cached':'live'}`;status.innerHTML=`<i></i> ${cached?'Cached GitHub data':'GitHub data connected'}`;
  $('#data-detail').textContent=`${data.repos.length} public repositories · ${cached?'Cached response':'Fetched from GitHub'} · ${new Date(data.savedAt).toLocaleDateString('en',{day:'numeric',month:'short',year:'numeric'})}`;
}
async function github(path){const response=await fetch(`https://api.github.com${path}`,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('GitHub unavailable');return response.json();}
async function loadData(){
  const cache=cachedData();if(cache){applyData(cache,true);if(Date.now()-cache.savedAt<TTL)return;}
  const [profile,repos]=await Promise.allSettled([github(`/users/${USER}`),github(`/users/${USER}/repos?per_page=100&sort=updated&type=owner`)]);
  if(profile.status==='fulfilled'&&repos.status==='fulfilled'){
    const data={profile:profile.value,repos:repos.value,savedAt:Date.now()};applyData(data);try{localStorage.setItem(CACHE_KEY,JSON.stringify(data));}catch{/* Storage is optional. */}
  }else if(!cache){
    const status=$('#api-status');status.className='api-status cached';status.innerHTML='<i></i> GitHub temporarily unavailable';
    $('#sync-note').textContent='Public API data unavailable';$('#data-detail').textContent='Selected work remains available. Live statistics will return when GitHub responds.';
    if(profile.status==='fulfilled')$('#repo-count').textContent=String(profile.value.public_repos);
    $('#languages').innerHTML='<p class="muted">GitHub language data is temporarily unavailable. Project technologies are listed on each card.</p>';
  }
}
loadData();
