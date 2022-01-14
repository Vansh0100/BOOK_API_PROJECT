let books=[
    {
    ISBN:"12345ONE",
    title:"Getting started with MERN",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["fiction","programming","tech","web dev"],
    publication:1,
},
{
    ISBN:"12345two",
    title:"Getting started with Python",
    authors:[1,2],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:550,
    category:["fiction","tech","web dev"],
    publication:1,
}
];

let authors=[{
    id:1,
    name:"vansh",
    books:["12345ONE","12345two"],
},
{
    id:2,
    name:"ram",
    books:["12345ONE","12345two"]
}
];

let publications=[
{
    id:1,
    name:"SHAPE AI PUBLICATIONS",
    books:["12345ONE","12345two"],
},
{
    id:2,
    name:"AGARWAL PUBLICATIONS",
    books:[],
}
]

module.exports={books,authors,publications};