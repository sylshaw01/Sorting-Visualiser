new Vue({
	el: "#app",
	data: {
		sortingMode: 'BubbleSort',
		arraySize: 100,
		sortSpeed: 1,
		values: [],
		counter: 0
	},
	methods: {
		scramble: function(){
			for(let i=0;i<this.arraySize;i++){
				this.values[i] = Math.random() * 100;
			}
			this.reRender();
			console.log(this.values)
		},
		reRender: function(){
			this.counter++;
		},
		async bubbleSort(){
			for(let i = 0; i < this.arraySize; i++){
       			for (let j = 0; j < this.arraySize -i; j++) {
           			await new Promise(r => setTimeout(r, this.sortSpeed));
           			this.reRender();
           			this.bubbleExchange(j);
            	}
            }
        },
        bubbleExchange: function(j){
        	if (this.values[j] > this.values[j + 1]) {
               			let tmp = this.values[j];
               			this.values[j] = this.values[j + 1];
               			this.values[j + 1] = tmp
               }
        }
    },
	
	created() {
		this.scramble();
	}

});