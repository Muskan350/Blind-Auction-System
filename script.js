let bids = JSON.parse(localStorage.getItem('bids')) || [];
const ADMIN_PASSWORD='auction123';
let timeLeft=300;

function updateBidCount(){
document.getElementById('bidCount').innerText='Total Secret Bids: '+bids.length;
}
updateBidCount();

function submitBid(){
const name=document.getElementById('name').value.trim();
const bid=parseInt(document.getElementById('bid').value);
if(!name||isNaN(bid)){alert('Enter valid details');return;}
bids.push({name,amount:bid});
localStorage.setItem('bids',JSON.stringify(bids));
updateBidCount();
document.getElementById('message').innerText='✅ Secret bid submitted successfully';
document.getElementById('name').value='';
document.getElementById('bid').value='';
}

function revealWinner(){
if(document.getElementById('adminPassword').value!==ADMIN_PASSWORD){alert('Wrong password');return;}
if(!bids.length){alert('No bids');return;}
let highest=Math.max(...bids.map(b=>b.amount));
let winners=bids.filter(b=>b.amount===highest);
let avg=(bids.reduce((a,b)=>a+b.amount,0)/bids.length).toFixed(2);
let low=Math.min(...bids.map(b=>b.amount));

document.getElementById('dashboard').innerHTML=`
<h3>Analytics</h3>
<p>Total Bids: ${bids.length}</p>
<p>Highest Bid: ₹${highest}</p>
<p>Lowest Bid: ₹${low}</p>
<p>Average Bid: ₹${avg}</p>`;

if(winners.length===1){
document.getElementById('result').innerHTML=`🏆 Winner: ${winners[0].name}<br>₹${highest}`;
}else{
document.getElementById('result').innerHTML=`🤝 Tie: ${winners.map(x=>x.name).join(', ')}<br>₹${highest}`;
}
}

setInterval(()=>{
let m=Math.floor(timeLeft/60);
let s=timeLeft%60;
document.getElementById('timer').innerText=`${m}:${String(s).padStart(2,'0')}`;
if(timeLeft<=0){document.querySelector('button').disabled=true;}
timeLeft--;
},1000);

function downloadPDF(){
const {jsPDF}=window.jspdf;
const doc=new jsPDF();
doc.text(document.getElementById('result').innerText||'No result yet',20,20);
doc.save('Auction_Result.pdf');
}