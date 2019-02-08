  function isMatchingPair( character1,  character2) 
    { 
       if (character1 == '(' && character2 == ')') 
         return true; 
       else if (character1 == '{' && character2 == '}') 
         return true; 
       else if (character1 == '[' && character2 == ']') 
         return true; 
       else
         return false; 
    } 

function check(s){
    var stack=[];
    for (var i = 0; i < s.length; i++) {
        if      (s.charAt(i) == '{') stack.push('{');
        else if (s.charAt(i) == '[') stack.push('[');
        else if (s.charAt(i) == '(') stack.push('(');
        else{
            let last = stack.pop();
            if(!isMatchingPair(last,s.charAt(i))){
                return false;
            }
        }
    }
    if(stack.length==0){
        return true;
    }else{
        return false;
    }
}
console.log(check("[{()()}]"));