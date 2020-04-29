new Vue({
	el: "#app",
	data: {
		sortingMode: 'BubbleSort',
		arraySize: 50,
		sortSpeed: 3000,
		values: [],
		counter: 0
	},
	methods: {
		scramble: function(){
			for(let i=0;i<this.arraySize;i++){
				this.values[i] = Math.ceil(Math.random() * 100);
			}
			this.reRender();
			console.log(this.values)
		},
		reRender: function(){
			this.counter++;
		},
		bubbleSort: function() {
			for(let i = 0; i < this.arraySize; i++){
       			for (let j = 0; j < this.arraySize; j++) {
           			setTimeout(this.bubbleExchange(j),this.sortSpeed);
            	}
            }
        },
        bubbleExchange: function(j){
        	if (this.values[j] > this.values[j + 1]) {
               			let tmp = this.values[j];
               			this.values[j] = this.values[j + 1];
               			this.values[j + 1] = tmp
                		this.reRender();
               }
        }
    },
	
	created() {
		this.scramble();
	}

});