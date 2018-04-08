<template>
     <div>
        <button class="code_btn" v-bind:class='{code_active_btn:!start}'>{{time | change}}</button>
     </div>
</template>

<script>
    export default {
        data () {
            return {
                time : '获取验证码',
            }
        },
        props : {
            start : {
                type : Boolean
            }
        },
        watch : {
            start (value,oldvalue) {
                if(value == true){
                    this.countDown()
                }
            }
        },
        methods: {
            countDown () {
                this.time = 10;
                let time = setInterval(()=>{
                    this.time --
                    if(this.time == 0){
                        this.$emit('countDown')
                        this.time = '获取验证码'
                        clearInterval(time)
                    }
                },1000)
            }
        },
        filters : {
            change (value) {
               if(!value) return ""
               if(!isNaN(value)){
                       return `重新发送${value}S`

               }else{
                   return value
               }
            }
        }

    }
</script>

<style lang="scss">
.code_btn{
  width:0.855rem;
  height:0.315rem;
  line-height: 0.315rem;
  font-size: 0.12rem;
  text-align: center;
  background-color:rgba(0,0,0,0.1);
  color: #999;
}
.code_active_btn{
  background-color: #ff6e15;
  color: white;
}
</style>
