const express = require('express');
const bodyparser = require('body-parser');
const { readdata, writedata } = require('./utilities/jsonreader');
const JournalEntry = require('./journal_class').JournalEntry
const app = express();

const cors = require('cors')
;
app.use(cors())
app.use(bodyparser.json());


app.get("/", (req, res) => {
    res.send("Hello there!")
});

app.post("/journalentries", (req, res) => {
    const title = req.body.factheader;
    const content = req.body.fact;
    const src = req.body.src;
    // console.log(req)
    const journalentries = readdata()
    // console.log(journalentries)
    let id;
    if (journalentries.length===0) {
        id = 1
    } else {
        let lastentryid = journalentries[journalentries.length-1].id;
        id = lastentryid + 1;
    }
    let entry = new JournalEntry({id: id, 
                                    title: title, 
                                    content: content,
                                    date: new Date().toLocaleDateString(), 
                                    time: new Date().toLocaleTimeString(),
                                    comment: [],
                                    reactions: [0,0,0],
                                    src: src
                                });
    console.log(entry)
    journalentries.push(entry.id)
    writedata(journalentries)
    res.json(journalentries)
    // res.status(201).send('Added.')    
    console.log("added");
});

app.get("/journalentries", (req, res) => {
    const journalentries = readdata()
    // res.status(201).send('Acquired journal entries.')
    res.send(journalentries)
})
app.get('/journalentries/:id', (req, res) => {
    let id = req.params.id
    // const data = req.body
    const journalentries = readdata()
    // const commented_entry = journalentries.filter(entry => entry.id == ParseInt(id))
    // commented_entry.comment.push(data)
    // writedata(journalentries)
    res.json(journalentries[id-1])
})
// app.patch('/journalentries/:id', (req, res) => {
//     let id = req.params.id
//     const data = req.body
//     const journalentries = readdata()
//     const commented_entry = journalentries.filter(entry => entry.id == ParseInt(id))
//     commented_entry.comment.push(data)
//     writedata(journalentries)
//     res.status(201).send('Commented.')
// })

app.patch('/journalentries', (req, res) => {
    // console.log(req.body)
    let clicked_id = req.body.clicked_id;
    // console.log(clicked_id)
    let id = clicked_id.replace(clicked_id[clicked_id.length-1], "");
    const journalentries = readdata();
    const entry = journalentries.filter( e => e.id == parseInt(id))[0];
    // console.log(entry)
    let index;
    if (clicked_id[clicked_id.length-1] === "a") {
        index = 0;
    } else if (clicked_id[clicked_id.length-1] === "b") {
        index = 1;
    } else if (clicked_id[clicked_id.length-1] === "c") {
        index = 2;
    }
    res.json(journalentries)
    entry.reactions[index] += 1;
    writedata(journalentries)
})

app.patch('/comments', (req, res) => {
    // console.log(req.body)
    let id = req.body.clicked_id;
    let h = req.body.h;
    console.log(id)
    const journalentries = readdata();
    const entry = journalentries.filter( e => e.id == parseInt(id))[0];
    console.log(entry)
    res.json(journalentries)
    entry.comment.push(h);
    writedata(journalentries)
})

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Server is listening on http://localhost:${port}/`));