const database=require('./database/index');
// console.log(database);

const express=require('express');

const app=express();
app.use(express.json());
app.get('/books',(req,res)=>{
    const getAllBooks=database.books;
    return res.json(getAllBooks);
})
app.get('/bookISBN/:isbn',(req,res)=>{
    const {isbn}=req.params;
    const getspecificBook=database.books.filter((book)=>book.ISBN==isbn)

    if(getspecificBook.length==0){
        return res.json({"error": `No book found for the ISBN of ${isbn}`});
    }
    return res.json(getspecificBook[0]);
})
app.get('/bookCategory/:cat',(req,res)=>{
    const {cat}=req.params;
    // console.log(cat);
    const getCategoryBook=database.books.filter((book)=>
        book.category.includes(cat)
    );
    // console.log(getCategoryBook);
    // console.log(getCategoryBook.length)
    if(getCategoryBook.length==0){
        return res.json({"error": `No book found for the category of ${cat}`});
    }
    return res.json(getCategoryBook);
})

app.get('/authors',(req,res)=>{
    const getAllAuthors=database.authors;
    return res.json(getAllAuthors);
})
app.get('/authorID/:ID',(req,res)=>{
    let {ID}=req.params;
    ID=Number(ID);
    const getsAuthorId=database.authors.filter((authors)=>authors.id===ID)

    if(getsAuthorId.length==0){
        return res.json({"error": `No author found for the id ${ID}`});
    }
    return res.json(getsAuthorId[0]);
})
app.get('/authorBooks/:isbn',(req,res)=>{
    const {isbn}=req.params;
    const getsAuthorBooks=database.authors.filter((authors)=>authors.books.includes(isbn))

    if(getsAuthorBooks.length==0){
        return res.json({"error": `No author found for the book ${isbn}`});
    }
    return res.json(getsAuthorBooks);
})
app.get('/publications',(req,res)=>{
    const getAllPublications=database.publications;
    return res.json(getAllPublications);
})
app.get('/publicationsBooks/:isbn',(req,res)=>{
    const {isbn}=req.params;
    const publicationsBooks=database.publications.filter((publication)=>publication.books.includes(isbn))

    if(publicationsBooks.length==0){
        return res.json({"error": `No publications found for the isbn ${isbn}`});
    }
    return res.json(publicationsBooks);
})
app.post('/book',(req,res)=>{
    console.log(req.body);
    database.books.push(req.body);
    res.json(database.books)
})
app.post('/author',(req,res)=>{
    console.log(req.body);
    database.authors.push(req.body);
    res.json(database.authors)
})
app.post('/publication',(req,res)=>{
    console.log(req.body);
    database.publications.push(req.body);
    res.json(database.publications)
})
app.put('/bookUpdate/:isbn',(req,res)=>{
    const {isbn}=req.params;
    database.books.forEach((book)=>{
        if(book.ISBN===isbn){
            console.log({...book,...req.body});
            return {...book,...req.body}
        }
        return book
    })
    return res.json(database.books);
})
app.put('/authorUpdate/:ID',(req,res)=>{
    let {ID}=req.params;
    ID=Number(ID);
    database.authors.forEach((author)=>{
        if(author.id===ID){
            console.log({...author,...req.body});
            return {...author,...req.body}
        }
        return author
    })
    return res.json(database.authors);
})
app.put('/publicationUpdate/:ID',(req,res)=>{
    let {ID}=req.params;
    ID=Number(ID);
    database.publications.forEach((publication)=>{
        if(publication.id===ID){
            console.log({...publication,...req.body});
            return {...publication,...req.body}
        }
        return publication
    })
    return res.json(database.publications);
})
app.delete('/Deletebook/:isbn',(req,res)=>{
    const {isbn}=req.params;
    console.log(isbn);
    const Deletebook=database.books.filter((book)=>
        book.ISBN!=isbn
    )
    console.log(Deletebook);
    database.books=Deletebook;

    res.json(database.books);
})
app.delete('/Deleteauthor/:ID',(req,res)=>{
    let {ID}=req.params;
    ID=Number(ID);
    console.log(ID);
    const Deleteauthor=database.authors.filter((author)=>
        author.id!==ID
    )
    console.log(Deleteauthor);
    database.authors=Deleteauthor;

    res.json(database.authors);
})
app.delete('/Deletepublication/:ID',(req,res)=>{
    let {ID}=req.params;
    ID=Number(ID);
    console.log(ID);
    const Deletepublication=database.publications.filter((publication)=>
        publication.id!==ID
    )
    console.log(Deletepublication);
    database.publications=Deletepublication;

    res.json(database.publications);
})
app.delete('/Deletebook-author/:isbn/:ID',(req,res)=>{
    let {isbn,ID}=req.params;
    ID=Number(ID);
    console.log(isbn,ID);
    database.books.forEach((book)=>{
        if(book.ISBN===isbn){
            if(!book.authors.includes(ID)){
                return;
            }
            book.authors=book.authors.filter((author)=>author!=ID)
            return book;
               
        
        }
        return book;
    })

    res.json(database.books);
})
app.listen(3000,()=>{
    console.log("API for getting book details is running currently.")
});