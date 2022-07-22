import React, { Children } from "react";
import "./TodoList.css";

function TodoList(props){
    return(
        <section>
            <ul>
                {props.children}
            </ul>
        </section>
    );
}


export {TodoList}