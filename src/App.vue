<template>
<div>
    <ul id="messages"></ul>
    <h2> Welcome, {{ user }}  </h2>
    <h5 v-for="(message,index) in messages" :key="index">{{ message }}</h5>
    <form action="">
        <input v-model="newMsg" autocomplete="off" placeholder="Type a message" />
        <button @click.prevent="send">Send</button>
    </form>
</div>
</template>

<script>
const socket = io('http://localhost:3000')

export default {
  data() {
    return {
      messages : [],
      newMsg : '',
      user : ''
    };
  },
  created () {
    let name = localStorage.getItem('name')
    this.user = name
  },
  methods : {
    send() {
      let name = localStorage.getItem('name')
      socket.emit('sendMsg',[this.newMsg,name])
    }
  },
  mounted : function() {
    socket.on('sendBackMsg',(msgFrom)=>{
        this.newMsg = ''
        this.messages.push(`${msgFrom[1]} said : ${msgFrom[0]}`)
      })
  }
};
</script>

<style scoped>
h2 {
  text-align: center
}
</style>