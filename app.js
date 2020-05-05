new Vue({
    el: "#app",
    data: {
        sortingMode: 'BubbleSort',
        arraySize: 100,
        sortSpeed: 1,
        values: [],
        counters: []
    },
    methods: {
        scramble: function() {
            this.values = [];
            for (let i = 0; i < this.arraySize; i++) {
                let obj = { 'id': Math.random() * 100 };
                this.values.push(obj);
            }
            console.log(this.values)
        },
        reRender: function() {},
        bubbleSort: function() {
            for (let i = 0; i < this.arraySize; i++) {
                for (let j = 0; j < this.arraySize - i - 1; j++) {
                    this.bubbleExchange(j);
                }
            }
        },
        bubbleExchange: function(j) {
            let vm = this;
            setTimeout(function() {
                if (vm.values[j].id > vm.values[j + 1].id) {
                    let tmp = vm.values[j].id;
                    vm.values[j].id = vm.values[j + 1].id;
                    vm.values[j + 1].id = tmp
                }
            }, this.sortSpeed);

        }
    },

    created() {
        this.scramble();
    }

});