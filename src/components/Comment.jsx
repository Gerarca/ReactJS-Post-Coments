import ReactTimeAgo from 'react-time-ago'
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React,{ useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import mongoosy from 'mongoosy/frontend';
import '../styleapp/comments.css';
const { Photo, User } = mongoosy;

const {
    Message, Login
} = mongoosy;

//OLD CODE
const Comments = () => {

    const history = useHistory();
    const { id, user, image, name } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    var today = new Date();
    
    

    useEffect( () => {
        const interval = setInterval(() => {
            
          }, 1000);
          return () => clearInterval(interval);
    },[comments]);

    const addComment = async () => {
        
        if( newComment === '' )
        { return; }
        comments.push({
                id_Post: id,//por defecto toma el nombre de la imagen
                user: user, //nombre de usuario
                comment: newComment,
                time: Date()
            }); 
        let loginuser = await Login.check();
        console.log(loginuser);
        /*
        let newMessage = new Message ({
            text: newComment, author: loginuser._id
            //Message.find({author.userId})...populate('author')
        }) 
        await newMessage.save();
        console.log(newMessage);  */
        setNewComment('');
    }

    return(
        <div className="container_com">
            <div className="container_body">
                <div className="div_image_com">
                    <img 
                        className="imagen_com"
                        src={'/uploads/' + image}                    
                        alt="picture"
                    />
                </div> 
                <div className="comments">
                    {
                        comments.length===0?
                        <p style={{color:'white'}}>Comments</p>
                        :
                        comments.map( item => 
                            <div className="comments_list" key={item.id_post}> 
                                <h4 className="userName">{name}</h4> 
                                <p>{item.comment}</p>        
                                <ReactTimeAgo date={item.time} locale="en-US"/>  {/*show time ago of each comment */}             
                            </div>
                        )            
                    } 
                    <div className="comments_input">
                        <input
                            className="input_com"
                            type="text"
                            value={newComment}
                            onChange={ (event) => setNewComment( event.target.value ) }
                            placeholder="Write a Comment"
                            autoFocus
                        />                    
                        <Button className="btn_com" onClick={ () => addComment() }> Send </Button>
                    
                        <Link className="back_com" to={"/homepage"}>
                            <ArrowBackIosIcon color="secondary"  title="Back"/>
                        </Link>
                    
                    </div>
                </div>    
            </div>                 
        </div>
    )
}

export default Comments;

// style={{color:'white', paddingTop:'15px', width:'95%'}} first

// style={{ display:'flex', justifyContent:'center'}} second

//src= {'/uploads/' + url}
//className="post-image"
//"https://miro.medium.com/max/11520/1*MKkufG0eyT0IQ5wZ70qKxQ.jpeg"