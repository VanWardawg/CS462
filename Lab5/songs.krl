
ruleset see_songs {
  meta {
    name "See Songs"
    description <<
A song ruleset for the Lab5
>>
    author "Kevin"
    logging on
    sharing on
 
  }

  rule songs is active {
    select when echo message input "(.*)" setting(m)
    send_directive("sing") with
      song = m;
  }
 
}