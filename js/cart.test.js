new Vue({
  el: '#app',
  data: {
    productList: [],
    selectAllFlag:false,
    delFlag:false,
    currProd:"",
  },filters:{
    formartMoney:function(value,type){
        return "￥"+value.toFixed(2);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.cartView();
    })
  },computed:{//监听计算总金额
  	calAllProdMoney:function(){
      var totalMoney=0;
      this.productList.forEach(function(item){
          if(item.checked){
            totalMoney+=item.productPrice*item.productQuantity;
          }
      });
      return totalMoney;
  	}
  },
  methods: {
      cartView: function() {
        this.$http.get("data/cartData.json").then(res=>{
            this.productList=res.body.result.list;
        });
      },
      //修改购车车数量
      changeCartNum:function(prod,status){
        if(status=='add'){
          prod.productQuantity++;
        }else{
          if(prod.productQuantity>0){
            prod.productQuantity--;
          }
        }
      },//选中与勾选
      selectProd:function(prod){
        if(prod.checked==undefined){
          this.$set(prod,"checked",true)
        }else{
          prod.checked=!prod.checked;
        }
        let count=0;
        this.productList.forEach(function(item){
          if(item.checked){
            count++;
          }
        });
        if(count==this.productList.length){
          this.selectAll(true);
        }else if(count==0){
          this.selectAll(false);
        }
      },
      //全选与取消全选
      selectAll:function(flag){
        let _this=this;
        _this.selectAllFlag=flag;
        _this.productList.forEach((item)=>{
            if(item.checked==undefined){
              _this.$set(item,"checked",_this.selectAllFlag);
            }else{
              item.checked=_this.selectAllFlag;
            }
        })
      },
      toDelProd:function(prod){
      	this.delFlag=true;
      	this.currProd=prod;
      },
      //删除商品提示
      doDelProd:function(){      	
      	this.productList.splice(this.currProd,1);
      	this.delFlag=false;
      }
    }
});
// 全局过滤器
Vue.filter('money', function(value, type) {
  return "¥" + value.toFixed(2) + type;
})
var app2=new Vue({
  el:"#app2",
  data:{
    total:1000
  }
})