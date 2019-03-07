import * as React from 'react'
import styled from 'styled-components';
class PageEditer extends React.Component{
    handleDrapCapture = (event) => {
            console.log('drap')
    }
    // the first drap 
    handleDrapEnterCapture = (event) => {
        console.log('handleDrapEnterCapture')
    }
    handleDrapLeaveCapture = (event) => {
        console.log('leave')
    }
    handleDrapStart =(ev) => {
        console.log('ev',ev.target)
            // ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
            ev.dataTransfer.setDragImage(ev.target,0,0);
        ev.dataTransfer.setDragImage(ev.target, 400 , 500)
        return true;
    }
    
    handleDrapOverCapture= (event) => {
        console.log('over')
    }
    handleDropCapture = (ev) => {
        console.log('drop')
        var src = ev.dataTransfer.getData("Text");
        ev.target.appendChild(document.getElementById(src));
        ev.stopPropagation();
        return false;
    }
    render(){
        return <><WrapperPage
            draggable
            onDragStartCapture= {this.handleDrapStart}
            onDragCapture = {this.handleDrapCapture}
            onDragEnterCapture={this.handleDrapEnterCapture}
            onDragOver={this.handleDrapOverCapture}
            onDragLeaveCapture={this.handleDrapLeaveCapture}
            onDropCapture={this.handleDropCapture}
        >
                
        </WrapperPage>
        <DrapItem draggable></DrapItem>
    </>
    }
}
export default PageEditer
const DrapItem = styled.div`
width : 50px;
height : 50px;
background : red;
`
const WrapperPage = styled.div`
    width  :100%;
    height : 900px;
    background : ${props => props.theme.bg.border};
`