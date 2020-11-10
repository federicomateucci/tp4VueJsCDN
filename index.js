Vue.component('square', {
    data() {
        return {
        }
    },
    props: ['square', 'pickedColor', 'mensajes', 'setAllColorsTo'],
    methods: {
		sqClick(){
			var clickedColor = this.square.backgroundColor;
			

			if (clickedColor === this.pickedColor) {
				this.mensajes.messageDisplay = "You Picked Right!";
				this.setAllColorsTo(this.pickedColor);
				this.mensajes.restartButton = "Play Again!";
				
				this.mensajes.headerColor = this.pickedColor;
			} else {
				this.square.backgroundColor = "#232323";
				this.mensajes.messageDisplay = "Try Again!";
			}
		}
	},
	computed: {
		getEstilos() {
			
			return this.square
		}
	},
	template: `
        <div :style="square" @click="sqClick()"></div>
    `
})

var app = new Vue({
	el: '#app',
	mounted() {
		this.init()
	},

    data: {
		pickedColor : 'RBG',
		mensajes : {
			headerColor : '',
			messageDisplay: '',
			restartButton : 'New colors',
		},
		colorCount : 6,
		isHard : true,
		colors : [],
		squares: []
    },
    methods: {
		reset() {
			this.restart();
		},
		easy() {
			if (this.isHard) {
				this.isHard = false;
				this.colorCount = 3;
				for (var i = 0; i < this.colorCount; i++) {
					this.squares[(i+3)].display = "none";
				}
				this.restart();
			}
		
		},
		hard() {
			if (!this.isHard) {
				this.isHard = true;
				this.colorCount = 6;
				this.restart();
				for (var i = 3; i < 6; i++) {
					this.squares[i].display = "block";
				}
			}
		},
		init(){
			for(let i=0; i<6; i++) {
				this.squares.push({
					display: 'block',
					backgroundColor: ''
				})
			}

		
			this.restart();
		},
		
		PickColor() {
			var quantity;
			if (this.isHard) {
				quantity = 6;
			} else {
				quantity = 3;
			}
			return Math.floor(Math.random() * quantity );
		},
		createNewColors(numbers){
			var arr = [];
			for (var i = 0; i < numbers; i++) {
				arr.push(this.createRandomStringColor());
			}
			return arr;
		},
		setAllColorsTo(color) {
			this.squares.forEach( square => {
				square.backgroundColor = color;
			})
		},		
		createRandomStringColor(){
			var newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")" ;
		
			return newColor;
		},
		randomInt(){
			return Math.floor(Math.random() * 256);
		},
		restart(){
			this.colors = this.createNewColors(this.colorCount);
			
			this.pickedColor = this.colors[this.PickColor()];
			this.mensajes.headerColor = "steelblue";
			this.mensajes.messageDisplay = "";
			this.mensajes.restartButton = "New Colors!";
			for (var i = 0; i <this.squares.length; i++) {
				this.squares[i].backgroundColor = this.colors[i];
			}
		}		
	},
    computed: {
    }
})
