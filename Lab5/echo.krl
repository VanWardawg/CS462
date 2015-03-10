
ruleset echo {
  meta {
    name "Echo"
    description <<
A first ruleset for the Lab5
>>
    author "Kevin"
    logging on
    sharing on
    provides hello
 
  }
  global {
    hello = function(obj) {
      msg = "Hello " + obj
      msg
    };
 
  }
  rule hello is active {
    select when echo hello
    send_directive("say") with
      something = "Hello World";
  }

  rule echo is active {
    select when echo message input "(.*)" setting(m)
    send_directive("say") with
      something = m;
  }
 
}