import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// EDITA AQUÍ colores, textos y escenas. 1080x1920, 60 fps, 85 segundos.
const C = {navy:'#102A4A', navy2:'#163E6C', blue:'#1879BC', sky:'#59C7EA', ice:'#EAF6FF', white:'#FFFFFF', ink:'#143250', muted:'#56718E', gold:'#F6BC65'};
const font = 'Arial, Helvetica, sans-serif';
const FPS = 60;
const seconds = (s:number) => Math.round(s*FPS);
const fade = (f:number, d=22) => interpolate(f,[0,d],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const pop = (f:number, fps:number, delay=0) => spring({frame:Math.max(0,f-delay),fps,config:{damping:19,stiffness:95,mass:0.85}});

const LogoPlaceholder: React.FC<{light?:boolean}> = ({light=false}) => (
  <div style={{display:'flex',alignItems:'center',gap:16,width:'100%',maxWidth:875}}>
    <div style={{width:54,height:54,flexShrink:0,borderRadius:14,border:`2px solid ${light?'#FFFFFF85':C.blue}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:light?C.white:C.blue}}></div>
    <div style={{fontSize:23,fontWeight:760,lineHeight:1.22,letterSpacing:0.5,color:light?'#F6FBFF':C.navy,maxWidth:730}}>
    </div>
  </div>
);
const Background: React.FC<{dark?:boolean}> = ({dark=false}) => {
  const frame=useCurrentFrame();
  return <AbsoluteFill style={{background:dark?`linear-gradient(155deg,${C.navy} 0%,${C.navy2} 72%,#0B567B 100%)`:`linear-gradient(165deg,#FFFFFF 0%,${C.ice} 100%)`,overflow:'hidden'}}>
    <div style={{position:'absolute',width:920,height:920,borderRadius:'50%',right:-440,top:-260,border:`2px solid ${dark?'#FFFFFF12':'#1572B515'}`,transform:`scale(${1+0.02*Math.sin(frame/70)})`}}/>
    <div style={{position:'absolute',width:760,height:760,borderRadius:'50%',left:-480,bottom:-320,border:`2px solid ${dark?'#FFFFFF12':'#1572B515'}`}}/>
    <div style={{position:'absolute',width:400,height:400,borderRadius:'50%',right:-200,bottom:120,background:dark?'#29A5E00A':'#36A5D012',filter:'blur(25px)'}}/>
  </AbsoluteFill>;
};
const Eyebrow: React.FC<{children:React.ReactNode;light?:boolean}> = ({children,light=false}) => <div style={{fontSize:24,letterSpacing:5,fontWeight:800,color:light?C.sky:C.blue,textTransform:'uppercase'}}>{children}</div>;
const Header: React.FC<{section:string;title:string;subtitle?:string;light?:boolean}> = ({section,title,subtitle,light=false}) => {
  const f=useCurrentFrame();const {fps}=useVideoConfig();const rise=pop(f,fps,9);
  return <div style={{opacity:fade(f,35),transform:`translateY(${(1-rise)*70}px)`}}>
    <Eyebrow light={light}>{section}</Eyebrow>
    <div style={{fontSize:78,fontWeight:900,lineHeight:1.06,letterSpacing:-2.5,color:light?C.white:C.ink,whiteSpace:'pre-line',marginTop:25}}>{title}</div>
    {subtitle&&<div style={{fontSize:34,lineHeight:1.32,color:light?'#D5ECFA':C.muted,marginTop:28,maxWidth:850}}>{subtitle}</div>}
  </div>;
};
const Icon: React.FC<{name:'people'|'school'|'heart'|'book'|'target'|'talk'|'check'|'growth'|'hand'|'briefcase'|'spark'|'arrow';size?:number;color?:string}> = ({name,size=64,color=C.blue}) => {
  const line={fill:'none',stroke:color,strokeWidth:3.2,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  const paths:Record<string,React.ReactNode>={
    people:<><circle cx="24" cy="16" r="8" {...line}/><circle cx="43" cy="20" r="6" {...line}/><path d="M8 52v-9c0-9 7-15 16-15s16 6 16 15v9M42 34c8 0 14 6 14 14v4" {...line}/></>,
    school:<><path d="M7 53V23l25-15 25 15v30H7ZM24 53V36h16v17M20 26h4M40 26h4" {...line}/></>,
    heart:<path d="M32 55 10 33C-1 18 19 5 32 21 45 5 65 18 54 33Z" {...line}/>,
    book:<><path d="M32 53c-8-7-17-8-26-6V13c10-2 19 0 26 6v34ZM32 53c8-7 17-8 26-6V13c-10-2-19 0-26 6v34Z" {...line}/></>,
    target:<><circle cx="32" cy="32" r="24" {...line}/><circle cx="32" cy="32" r="13" {...line}/><circle cx="32" cy="32" r="3" fill={color}/></>,
    talk:<><path d="M8 12h48v34H27L13 56V46H8V12Z" {...line}/><path d="M19 24h25M19 34h17" {...line}/></>,
    check:<><circle cx="32" cy="32" r="24" {...line}/><path d="m19 32 9 9 18-20" {...line}/></>,
    growth:<><path d="M8 53V11M8 53h49M17 43l14-15 9 7 15-21M44 14h11v11" {...line}/></>,
    hand:<><path d="M12 37h15l9-8c5-4 10 1 6 5l-5 6 14-3c10-2 12 9 3 12L33 56 12 46Z" {...line}/></>,
    briefcase:<><rect x="8" y="19" width="48" height="35" rx="5" {...line}/><path d="M22 19v-7h20v7M8 34c15 8 33 8 48 0" {...line}/></>,
    spark:<><path d="M32 5 38 26 59 32 38 38 32 59 26 38 5 32 26 26Z" {...line}/></>,
    arrow:<path d="M7 32h48M39 16l16 16-16 16" {...line}/>
  };
  return <svg width={size} height={size} viewBox="0 0 64 64">{paths[name]}</svg>;
};
const Pill: React.FC<{icon:React.ComponentProps<typeof Icon>['name'];text:string;f:number;delay?:number}> = ({icon,text,f,delay=0}) => {
  const {fps}=useVideoConfig();const v=pop(f,fps,delay);
  return <div style={{display:'flex',alignItems:'center',gap:22,padding:'26px 30px',background:'#FFFFFF',borderRadius:24,boxShadow:'0 18px 45px #16446A13',opacity:v,transform:`translateY(${(1-v)*75}px)`}}><div style={{height:85,width:85,borderRadius:22,background:C.ice,display:'grid',placeItems:'center',flexShrink:0}}><Icon name={icon} size={48}/></div><div style={{fontSize:32,fontWeight:760,color:C.ink,lineHeight:1.15}}>{text}</div></div>;
};
const Wrapper:React.FC<{children:React.ReactNode;dark?:boolean}> = ({children,dark=false}) => <AbsoluteFill><Background dark={dark}/><div style={{position:'absolute',top:108,left:84,right:84}}><LogoPlaceholder light={dark}/></div><div style={{position:'absolute',bottom:112,left:84,width:100,height:7,borderRadius:10,background:C.sky}}/>{children}</AbsoluteFill>;

const Intro:React.FC = () => {
 const f=useCurrentFrame();const {fps}=useVideoConfig();const v=pop(f,fps,12);
 return <Wrapper dark><div style={{position:'absolute',top:480,left:84,right:80}}>
 <Eyebrow light>Presentamos</Eyebrow>
 <div style={{fontSize:88,fontWeight:900,color:C.white,lineHeight:1.08,letterSpacing:-2.8,marginTop:30,opacity:fade(f,25),transform:`translateY(${(1-v)*100}px)`}}>Unidad de<br/><span style={{color:C.sky}}>Desarrollo</span><br/>Organizacional</div>
 <div style={{fontSize:33,color:'#DEEFFB',lineHeight:1.38,marginTop:62,opacity:fade(f-35,28)}}>Personas valoradas.<br/>Equipos fortalecidos.<br/>Comunidades que colaboran.</div>
 </div><div style={{position:'absolute',bottom:300,right:90,opacity:0.33,transform:`rotate(${f/120}deg)`}}><Icon name="spark" color={C.sky} size={225}/></div></Wrapper>;
};
const Purpose:React.FC = () => {
 const f=useCurrentFrame();return <Wrapper><div style={{position:'absolute',top:380,left:84,right:84}}><Header section="Nuestro propósito" title="Acompañar a quienes educan" subtitle="Fortalecemos el desempeño, el bienestar y las oportunidades de desarrollo."/></div><div style={{position:'absolute',top:880,left:84,right:84,display:'grid',gap:22}}>
 <Pill icon="people" text="Docentes y asistentes de la educación" f={f} delay={22}/>
 <Pill icon="briefcase" text="Funcionarios del DEM" f={f} delay={42}/>
 <Pill icon="school" text="Equipos directivos" f={f} delay={62}/>
 </div></Wrapper>;
};
const Pillars:React.FC = () => {
 const f=useCurrentFrame();const items=[{icon:'target' as const,num:'01',title:'Acompañamiento',sub:'Formativo al desempeño'},{icon:'heart' as const,num:'02',title:'Bienestar',sub:'Y clima laboral'},{icon:'book' as const,num:'03',title:'Formación',sub:'Y capacitación'}];
 return <Wrapper dark><div style={{position:'absolute',top:365,left:84,right:80}}><Header section="Nuestro modelo" title="Tres pilares. Un propósito." light/></div><div style={{position:'absolute',top:835,left:84,right:84,display:'flex',flexDirection:'column',gap:22}}>{items.map((it,i)=>{const v=pop(f,60,20+i*24);return <div key={it.num} style={{background:'#FFFFFF12',border:'1px solid #FFFFFF35',borderRadius:26,padding:'35px 32px',display:'flex',gap:28,alignItems:'center',transform:`translateX(${(1-v)*90}px)`,opacity:v}}><div style={{background:'#FFFFFF18',borderRadius:18,padding:16}}><Icon name={it.icon} size={66} color={C.sky}/></div><div><div style={{fontSize:22,color:C.sky,fontWeight:800,letterSpacing:3}}>{it.num}</div><div style={{fontSize:38,color:C.white,fontWeight:850}}>{it.title}</div><div style={{fontSize:27,color:'#CDE7F7',marginTop:3}}>{it.sub}</div></div></div>;})}</div></Wrapper>;
};
const YearScene:React.FC<{year:string;title:string;subtitle:string;items:{icon:React.ComponentProps<typeof Icon>['name'];label:string}[];dark?:boolean}> = ({year,title,subtitle,items,dark=false}) => {
 const f=useCurrentFrame();return <Wrapper dark={dark}><div style={{position:'absolute',top:340,left:84,right:84}}><Eyebrow light={dark}>{year}</Eyebrow><Header section="" title={title} subtitle={subtitle} light={dark}/></div><div style={{position:'absolute',top:770,left:85,right:85,display:'flex',flexDirection:'column',gap:24}}>{items.map((it,i)=>{const v=pop(f,60,20+i*18);return <div key={it.label} style={{display:'flex',alignItems:'center',gap:26,opacity:v,transform:`translateX(${(1-v)*90}px)`,padding:'21px 22px',borderRadius:22,background:dark?'#FFFFFF15':'#FFFFFF',boxShadow:dark?'none':'0 8px 38px #163F6D12'}}><div style={{background:dark?'#FFFFFF17':C.ice,padding:16,borderRadius:15}}><Icon name={it.icon} size={55} color={dark?C.sky:C.blue}/></div><div style={{color:dark?C.white:C.ink,fontSize:32,fontWeight:760,lineHeight:1.15}}>{it.label}</div></div>;})}</div></Wrapper>;
};
const Philosophy:React.FC=()=>{const f=useCurrentFrame();const words=['Escuchar','Orientar','Reconocer','Mejorar juntos'];return <Wrapper><div style={{position:'absolute',top:420,left:84,right:84}}><Header section="Nuestra forma de trabajar" title="Acompañar es crecer juntos" subtitle="Un proceso gradual, participativo y formativo. No sancionatorio."/></div><div style={{position:'absolute',top:1000,left:84,right:84,display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>{words.map((w,i)=>{const v=pop(f,60,i*15+15);return <div key={w} style={{height:200,borderRadius:22,background:i===3?C.navy:C.white,color:i===3?C.white:C.ink,boxShadow:'0 8px 32px #1C4A7815',display:'grid',placeItems:'center',fontSize:32,fontWeight:800,opacity:v,transform:`scale(${0.85+0.15*v})`}}>{w}</div>;})}</div></Wrapper>};
const Outro:React.FC=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();const v=pop(f,fps,10);return <Wrapper dark><div style={{position:'absolute',top:525,left:84,right:84,opacity:fade(f,28),transform:`translateY(${(1-v)*70}px)`}}><Eyebrow light>Unidad de Desarrollo Organizacional</Eyebrow><div style={{fontSize:70,lineHeight:1.19,fontWeight:900,letterSpacing:-1.2,color:C.white,marginTop:40}}>Acompañamos <span style={{color:C.sky}}>personas.</span><br/>Fortalecemos <span style={{color:C.sky}}>equipos.</span><br/>Desarrollamos <span style={{color:C.sky}}>instituciones.</span></div><div style={{height:3,width:500,background:C.sky,marginTop:65}}/><div style={{fontSize:31,color:'#D6EBF8',marginTop:40}}>Dirección de Educación Municipal de Angol</div></div></Wrapper>};

// Transiciones de entrada/salida globales. Se superponen 0.4 s entre escenas
// sin alterar la duración total de 85 segundos. El texto y las tarjetas conservan
// sus animaciones individuales.
const OVERLAP = 24; // 0,4 segundos a 60 fps
const SceneLayer: React.FC<{children: React.ReactNode; duration: number; first?: boolean; last?: boolean}> = ({children,duration,first=false,last=false}) => {
  const frame = useCurrentFrame();
  const intro = interpolate(frame,[0,OVERLAP],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const outro = interpolate(frame,[duration-OVERLAP,duration],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const opacity = (first ? 1 : intro) * (last ? 1 : outro);
  const translateY = (first ? 0 : (1-intro)*28) + (last ? 0 : (1-outro)*(-20));
  const scale = 1 + (last ? 0 : (1-outro)*0.012);
  return <AbsoluteFill style={{opacity,transform:`translateY(${translateY}px) scale(${scale})`}}>{children}</AbsoluteFill>;
};

const scenes = [
  {from:0, duration:12, element:<Intro/>},
  {from:12, duration:12, element:<Purpose/>},
  {from:24, duration:12, element:<Pillars/>},
  {from:36, duration:16, element:<YearScene year="2026 · Implementación" title="Construimos las bases" subtitle="Escuchamos a los equipos y definimos prioridades." items={[{icon:'talk',label:'Reuniones con equipos educativos'},{icon:'target',label:'Diagnósticos participativos'},{icon:'briefcase',label:'Revisión de perfiles y metas'},{icon:'book',label:'Capacitación de equipos de gestión'}]}/>},
  {from:52, duration:19, element:<YearScene year="2027 · Próximos pasos" title="El acompañamiento crece" subtitle="Desde marzo, avanzaremos gradualmente." dark items={[{icon:'target',label:'Entrevistas por metas'},{icon:'people',label:'Acompañamiento en terreno'},{icon:'hand',label:'Inducción y reincorporación laboral'},{icon:'heart',label:'Autocuidado y diálogo'},{icon:'book',label:'Formación continua'}]}/>},
  {from:71, duration:7, element:<Philosophy/>},
  {from:78, duration:7, element:<Outro/>},
];

export const UDOVideo:React.FC = ()=> (
 <AbsoluteFill style={{fontFamily:font,backgroundColor:C.navy}}>
  {scenes.map((scene,i)=>{
    const first=i===0;
    const last=i===scenes.length-1;
    const startFrame=seconds(scene.from)-(first?0:OVERLAP);
    const durationFrames=seconds(scene.duration)+(first?0:OVERLAP);
    return <Sequence key={scene.from} from={startFrame} durationInFrames={durationFrames}>
      <SceneLayer duration={durationFrames} first={first} last={last}>{scene.element}</SceneLayer>
    </Sequence>;
  })}
  {}
 </AbsoluteFill>
);
