
export function splitAlgo(bills) {
    const map = new Map();
    const edges = [];
    const set = new Set();
    for (let bill of bills) {
        const { payer, total, shares } = bill;
        set.add(payer);
        for (let i of shares) {
            const { name, share: amt } = i;
            set.add(name);
            if (name === payer) {
                continue;
            } else {
                edges.push({
                    before: name,
                    after: payer,
                    amount: parseFloat(amt)
                })
            }
        }
    }
    const people = []
    for (let i of set) {
        people.push(i);
    }
    people.sort();
    console.log("edges", edges, "people", people);
    const count = people.length;
    let payment = []
    for (let i = 0; i < people.length; ++i) {
        payment.push(0);
    }
    while (edges.length != 0) {
        const { before: start, after: end, amount: amt } = edges[0];
        const ind = people.indexOf(start);
        let next = ind;
        while (people[next] != end) {
            payment[next] += amt;
            next = (next + 1) % count;
        }
        edges.splice(0, 1);
    }
    console.log("payment", payment);
    let minimum = Number.MAX_VALUE;
    for (let i of payment) {
        minimum = Math.min(minimum, i);
    }
    if (minimum != 0) {
        payment = payment.map((x) => x - minimum);
    }
    const ans = [];
    for (let i = 0; i < payment.length; ++i) {
        if (payment[i] != 0) {
            ans.push({
                start: people[i],
                end: people[(i + 1) % count],
                amount: payment[i]
            })
        }
    }
    console.log("ans", ans)
    return ans;
}