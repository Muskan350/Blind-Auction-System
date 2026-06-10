let bids = {};

function addBid(){

    const name = document.getElementById("name").value;
    const bid = parseInt(document.getElementById("bid").value);

    if(name === "" || isNaN(bid)){
        alert("Please enter valid details");
        return;
    }

    bids[name] = bid;

    const li = document.createElement("li");
    li.textContent = `${name} - $${bid}`;

    document.getElementById("bidList").appendChild(li);

    document.getElementById("name").value = "";
    document.getElementById("bid").value = "";
}

function findWinner(){

    const values = Object.values(bids);

    if(values.length === 0){
        alert("No bids placed");
        return;
    }

    const highestBid = Math.max(...values);

    const winners = [];

    for(let bidder in bids){
        if(bids[bidder] === highestBid){
            winners.push(bidder);
        }
    }

    if(winners.length === 1){
        document.getElementById("result").innerHTML =
        `🏆 Winner: ${winners[0]} with $${highestBid}`;
    }
    else{
        document.getElementById("result").innerHTML =
        `🤝 Tie Between: ${winners.join(", ")} with $${highestBid}`;
    }
}
