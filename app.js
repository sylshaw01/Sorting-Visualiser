new Vue({
    el: "#app",
    data: {
        sortingMode: 'BubbleSort',
        arraySize: 50,
        sortSpeed: 0,
        values: [],
        sorting: false
    },
    methods: {
        //Method to randomise all array values
        scramble: function() {
            this.values = [];
            this.sorting = false;
            for (let i = 0; i < this.arraySize; i++) {
                /*Looks strange but I use an object here so rerendering occurs for individual blocks instead
                  Of having the whole app rerender on every bubblesort iteration, also allows me to add colour information */
                let obj = {
                    'id': Math.random() * 100,
                    'sorted': false
                };
                this.values.push(obj);
            }
        },
        //Simple bubble sort algorithm
        async bubbleSort() {
            //Setting state variables so sorting cannot be invoked twice at once
            this.sorting = true;
            let counter = 0;
            for (let i = 0; i < this.arraySize; i++) {
                for (let j = 0; j < this.arraySize - i - 1; j++) {
                    await this.bubbleExchange(j, i, ++counter);

                }
                //Changes bar colour to green
                this.values[this.arraySize - i - 1].sorted = true;
            }
            //Resetting state variable so you can sort again
            this.sorting = false;
        },
        //Split into separate function here to deal with the async problems that arise with having setTimeout in a loop
        bubbleExchange: function(j, i, counter) {
            if (this.values[j].id > this.values[j + 1].id) {
                let tmp = this.values[j].id;
                this.values[j].id = this.values[j + 1].id;
                this.values[j + 1].id = tmp
            }

            return new Promise(resolve => setTimeout(resolve, this.sortSpeed));

        }
    },
    computed: {
        blockWidth: function() {
            return 100 / this.arraySize + '%';
        }

    },
    //After the instance is initialised, all array elements get randomised
    created() {
        this.scramble();
    },
    watch: {
        arraySize: function() {
            this.scramble();
        }
    }

});