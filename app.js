new Vue({
    el: "#app",
    data: {
        sortingMode: 'BubbleSort',
        arraySize: 50,
        sortSpeed: 150,
        values: [],
        sorting: false,
        sorted: false
    },
    methods: {
        //Method to randomise all array values
        scramble: function() {
            this.values = [];
            this.sorting = false;
            this.sorted = false;
            for (let i = 0; i < this.arraySize; i++) {
                /*Looks strange but I use an object here so rerendering occurs for individual blocks instead
                  Of having the whole app rerender on every bubblesort iteration, also allows me to add colour information */
                let obj = {
                    'id': Math.random() * 100,
                    'sorted': false,
                    'active': false,
                };
                this.values.push(obj);
            }
        },
        //Simple bubble sort algorithm
        async bubbleSort() {
            //Setting state variables so sorting cannot be invoked twice at once
            this.sorting = true;
            for (let i = 0; i < this.arraySize; i++) {
                for (let j = 0; j < this.arraySize - i - 1; j++) {
                    //Changes the current active bar to purple
                    this.values[j].active = true;
                    await this.swapValues(j, j + 1);
                    //change the active bars to false
                    this.values[j].active = false;
                    this.values[j + 1].active = false;

                }
                //Changes bar colour to green
                this.values[this.arraySize - i - 1].sorted = true;
            }
            //Resetting state variable so you can sort again
            this.sorting = false;
            this.sorted = true;
        },
        //Split into separate function here to deal with the async problems that arise with having setTimeout in a loop
        swapValues: function(j, active) {
            if (this.values[j].id > this.values[j + 1].id) {
                //If a bar is being switched, colour it purple
                this.values[active].active = true;
                //Switch the two values
                let tmp = this.values[j].id;
                this.values[j].id = this.values[j + 1].id;
                this.values[j + 1].id = tmp
            }
            // wait for sortSpeed amt of time
            return new Promise(resolve => setTimeout(resolve, 300 - this.sortSpeed));

        },
        async insertionSort() {
            this.sorting = true;
            for (let i = 1; i < this.arraySize; i++) {
                this.values[i].sorted = true;
                let j = i;
                while (j > 0 && this.values[j - 1].id > this.values[j].id) {
                    await this.swapValues(j - 1, j - 1);
                    this.values[j - 1].active = false;
                    j--;
                }
                this.values[i].sorted = false;
            }
            this.sorting = false;
            this.sorted = true;
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