export const uid=()=>globalThis.crypto.randomUUID();
export const day=()=>new Date().toLocaleDateString('en-CA');
export function parseBulk(text){
 const rows=[],errors=[];
 text.split(/\r?\n/).forEach((line,i)=>{if(!line.trim())return;const parts=line.split(line.includes('\t')?'\t':'||').map(s=>s.trim());if(parts.length<2||parts.length>3||!parts[0]||!parts[1])errors.push(i+1);else rows.push({q:parts[0],a:parts[1],hint:parts[2]||''});});return{rows,errors};
}
export function freshCard(v){return{id:uid(),q:v.q.trim(),a:v.a.trim(),hint:(v.hint||'').trim(),star:false,streak:0,seen:0,wrong:0,lastWrong:false,due:0};}
export function grade(card,correct,now=Date.now()) {const streak=correct?card.streak+1:0;const days=correct?[1,3,7,14,30,60][Math.min(streak-1,5)]:0;return{...card,streak,seen:card.seen+1,wrong:card.wrong+(correct?0:1),lastWrong:!correct,due:now+(correct?days*86400000:600000)};}
export function normalizeBackup(data){if(data?.version!==1||!Array.isArray(data.decks)||data.decks.length>500)throw Error('Tệp sao lưu không hợp lệ.');let count=0;return data.decks.map(d=>{if(typeof d.name!=='string'||!d.name.trim()||!Array.isArray(d.cards))throw Error('Bộ câu hỏi không hợp lệ.');return{id:uid(),name:d.name.slice(0,160),tag:typeof d.tag==='string'?d.tag.slice(0,80):'',color:['purple','green','orange','blue'].includes(d.color)?d.color:'purple',created:Date.now(),cards:d.cards.map(c=>{if(++count>30000||typeof c.q!=='string'||typeof c.a!=='string'||!c.q.trim()||!c.a.trim()||c.q.length>20000||c.a.length>30000)throw Error('Nội dung câu hỏi không hợp lệ hoặc quá lớn.');const f=freshCard({q:c.q,a:c.a,hint:typeof c.hint==='string'?c.hint:''});for(const k of ['streak','seen','wrong','due'])if(Number.isFinite(c[k])&&c[k]>=0)f[k]=Math.min(c[k],k==='due'?1e15:1e6);f.star=!!c.star;f.lastWrong=!!c.lastWrong;return f;})};});}
export function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
