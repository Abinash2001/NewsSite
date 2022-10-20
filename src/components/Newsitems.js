import React from 'react'

const Newsitems =(props)=>{
        let {title,description,imageUrl,newsUrl,author,date}=props;
        return ( 
        <>
            <div className="card" style={{marginBottom: '20px'}}>
                <img src={imageUrl?imageUrl:'https://img.etimg.com/thumb/msid-92805861,width-1070,height-580,imgsize-114632,overlay-etmarkets/photo.jpg'} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title} ...</h5>
                    <p className="card-text">{description} ...</p>
                    <p className="card-text"><small className="text-muted" style={{fontSize:'11px'}}>By {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' className="btn btn-primary" rel="noreferrer">Read more</a>
                </div>
            </div>
        </>
        )
}

export default Newsitems