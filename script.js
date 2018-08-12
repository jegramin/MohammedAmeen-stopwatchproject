class Component
{
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer
{
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen () {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}


class stopWatch extends Component{
    constructor(){
        super();
        this.hours=0;
        this.minutes=0;
        this.seconds=0;
        this.milliSeconds=0;
        this.pauseTiming;
        
    }
    
    
    start(){
        let secFunc;
        return secFunc = () => { 
            this.pauseTiming = setTimeout(() => {
                this.milliSeconds++;
                if(this.milliSeconds >= 100){
                    this.milliSeconds = 0;
                    this.seconds++;
                    if (this.seconds >= 60) {
                        this.seconds = 0;
                        this.minutes++;
                        if (this.minutes >= 60) {
                            this.minutes = 0;
                            this.hours++;
                        }
                    }
                }
                secFunc();
                this.notify(); 
            },10)
        }
    }
    
    

    pause(){
        return () => { 
            clearTimeout(this.pauseTiming);
            this.notify();
        }
    }
    reset(){
        return () => {
            this.hours=0;
            this.minutes=0;
            this.seconds=0;
            this.milliSeconds=0;
            
        }
    }
    format () {
        return (this.hours > 9 ? this.hours : "0" + this.hours)  
        + ":" + (this.minutes > 9 ? this.minutes : "0" + this.minutes)  
        + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds )
        + ":" + (this.milliSeconds > 9 ? this.milliSeconds : "0" + this.milliSeconds)
       
        
        
    }
    render(){
        return $('<div>')
            .append($("<p>")
                .html(this.format()))
                    .append([
                        $('<button>').html('Start').mousedown(this.start()),
                        $('<button>').html('Pause').mousedown(this.pause()),
                        $('<button>').html('Reset').mousedown(this.reset()).mousedown(this.pause())
                    ])[0];
                }
            }
