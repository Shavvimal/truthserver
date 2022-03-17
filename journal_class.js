class JournalEntry {
    constructor(id,title,content,date,time,comment, reactions, src) {
        this.id = id 
        this.title = title
        this.content = content
        this.date = date  
        this.time = time 
        this.comment = comment
        this.reactions = reactions
        this.src = src
    }
}

module.exports = {JournalEntry}