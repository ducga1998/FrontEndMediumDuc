import * as React from 'react'
import styled from 'styled-components';
import INTERATION from 'src/reuse/interaction'
class PageEditer extends React.Component{
    refSel :HTMLElement
    flowRef : HTMLElement
    // the first drap 
    handleDrapEnterCapture = (ev) => {
        console.log('enter', ev.target)
        // const data = ev.target.getAttribute('data-element')
        // console.log('data ' , data)
        // ev.dataTransfer.setData("PB-duc", 'data');
    }
    handleDrapLeaveCapture = (event) => {
        // console.log('leave')
        // const dom = event.target
        // console.log('leave dom' , dom)
        // const button =  document.createElement('button')
        // dom.appendChild(button)
        // button.innerHTML ='button'
    }
    handleDrapStartCapture =(ev) => {
       console.log('start' ,ev)
    //    console.log('enter', ev.target)
       const data = ev.target.getAttribute('data-element')
       console.log('data ' , data)
       ev.dataTransfer.setData("PB-duc", data);
    }
    
    handleDrapOverCapture= (event) => {
        event.preventDefault()
        const targetDom =  event.target as HTMLElement
        
        const {width, height , top , left} = targetDom.getBoundingClientRect()
        Object.assign( this.refSel.style, {width : width +'px', height : height +'px' , top : top + 'px', left: left + 'px' , display : 'block' } )
        const nX = event.nativeEvent.offsetX
        const nY = event.nativeEvent.offsetY
        const scrollTop  =window.scrollY
        console.log('nX nY', nX,nY)
        const distance  = 7
        let checkTH  = ''
        //Th1 : left
        // this.flowRef.style.display  =  'block'
        if(nX >  0 && nX < distance){
            checkTH = 'left'
            this.flowRef.style.display  = 'block'
            console.log('TH1 left' )
            this.flowRef.style.width  = '2px'
            this.flowRef.style.height = height+ 'px'
            this.flowRef.style.left = left + 'px'
            this.flowRef.style.top = (top + scrollTop) + 'px'
        }
        if(nX > width - distance && nX < width){
            checkTH = 'right'
            this.flowRef.style.display  = 'block'
            console.log('TH2 right' )
            this.flowRef.style.width  = '2px'
            this.flowRef.style.height = height+ 'px'
            this.flowRef.style.left = left + width + 'px'
            this.flowRef.style.top = (top + scrollTop) + 'px'
        }
        if(nY >0 && nY < distance ){
            checkTH = 'top'
            this.flowRef.style.display  = 'block'
            this.flowRef.style.width  = width + 'px'
            this.flowRef.style.height = '2px'
            this.flowRef.style.left = left  + 'px'
            this.flowRef.style.top = (top + scrollTop) + 'px'
        }
        if(nY < height && nY > (height - distance) ){
            checkTH ='bottom'
            this.flowRef.style.display  = 'block'
            this.flowRef.style.width  = width + 'px'
            this.flowRef.style.height = '2px'
            this.flowRef.style.left = left  + 'px'
            this.flowRef.style.top = (top + scrollTop) + height + 'px'
        }
        if(nX >  distance && nX < (left - distance) || nY > distance && nY < (width - distance) ){
            // this.flowRef.style.display  = 'none'
           
        }
        INTERATION.position = checkTH
        


        

    }
    handleDropCapture = (ev) => {
        ev.preventDefault()
		ev.stopPropagation()
        console.log('drop',ev.target)
        const nameDom =  ev.dataTransfer.getData("PB-duc");
        console.log('nameDom',nameDom)
        if(!nameDom || nameDom.length === 0 ) return
        const dom =  document.createElement(nameDom) as HTMLElement
        dom.innerHTML = nameDom
        dom.setAttribute('draggable', 'true')
        dom.setAttribute('data-element', nameDom)
        ev.target.appendChild(dom);
        this.refSel.style.display = 'none'
    }
    handleDrapStart = (event ) => {
        event.stopPropagation()
        const data = event.target.getAttribute('data-element')
        console.log('data ' , data)
        event.dataTransfer.setData("PB-duc", data);
    }
    render(){
        return <><WrapperPage
            draggable
            onDragStartCapture= {this.handleDrapStart}
            onDragOverCapture={this.handleDrapOverCapture}
            onDragLeaveCapture={this.handleDrapLeaveCapture}
            onDropCapture={this.handleDropCapture}
       />  
            <Selection  ref={e => this.refSel  = e}/>
            <Flow  ref={e => this.flowRef = e}/>
            <Inspetor
                onDragStartCapture={this.handleDrapStartCapture}
            >
                {
                    ['div','a','span','button','input' ,'section'].map(item => {
                    return <DrapItem 
                        data-element={item} 
                        draggable
                        >
                        {item}
                    </DrapItem>
                })
                }
                
            </Inspetor>
    </>
    }
}

export default PageEditer
const Inspetor = styled.div`
display : flex;
`
const Flow = styled.div`
    position: absolute;
	box-sizing: border-box;
    background : blue;
	pointer-events: none;
	/* display: none; */
	z-index: 10;
   
	a {
		pointer-events: initial;
		&:hover {
			color: #fff;
		}
	}
	&:after{
		position: absolute;
		top:-2px;
		right: -2px;
		bottom: -2px;
		left: -2px;
		content: '';
		border: 2px dashed red;
	}
`
const Selection = styled.div`
	position: fixed;
	box-sizing: border-box;
	border: 2px solid red;
	pointer-events: none;
	display: none;
	z-index: 10;
	a {
		pointer-events: initial;
		&:hover {
			color: #fff;
		}
	}
	&:after{
		position: absolute;
		top:-2px;
		right: -2px;
		bottom: -2px;
		left: -2px;
		content: '';
		border: 2px dashed red;
	}
`
const DrapItem = styled.div`
    width : 50px;
    height : 50px;
    background : red;
    margin: 20px;
`
const WrapperPage = styled.div`
    width  :100%;
    height : 900px;
    background : ${props => props.theme.bg.border};
    div {
        background : ${props => props.theme.bg.default};
        padding :10px;
    }
    section{
        margin : 50px;
        padding : 40px;
        background : ${props => props.theme.bg.default};
    }
`