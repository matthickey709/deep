#!/usr/bin/env bash

#usage:
#checker.sh [ex#]

#Checks a specific exercise
check(){
    answer=`node ex"$1" 2>/dev/null`
    solution=`node sol"$1"`
    echo "Checking exercise $1" 
    if [ "$answer" == "$solution" ] ; then
        echo "Success"
    else
        echo "Fail"
        echo "Expected: $solution"
        echo "Received: $answer"
    fi
    echo ""
}


#if one arg passed then run that test
if [ "$#" -eq 1 ]; then
    check $1;
else
    for i in `seq 1 7`;
    do
        check $i
    done
fi

