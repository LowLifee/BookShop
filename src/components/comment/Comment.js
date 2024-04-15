import { useEffect } from 'react';
import './comment.css';

const Comment = (props) => {
   const { comment, id } = props;
   const element = (comment.text)
   useEffect(() => {
      document.getElementById(`${id}` + 'sector').innerHTML = element;
   })
   return (
      <div className="comment" id={id + 'sector'}>
      </div>
   )
}

export default Comment;