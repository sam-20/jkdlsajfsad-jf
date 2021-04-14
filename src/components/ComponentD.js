


function ComponentD() {

    let array1 = ["kofi", "ama", 12, "adum", 0.3]
    let array2 = [
        {
            name: 'john',
            age: 24,
            height: '183cm'
        },
        {
            name: 'mary',
            age: 26,
            height: '180cm'
        },
        {
            name: 'alfred',
            age: 14,
            height: '90cm'
        }]
    let array3 = [14, 9, 12, "pineapple", 10, "mango", "pear", 19, 8]
    let array4 = [
        {
            english: 78,
            maths: 66,
            science: 80
        },
        {
            english: 82,
            maths: 71,
            science: 60
        },
        {
            english: 50,
            maths: 84,
            science: 34
        }]

    console.log(`initial array1: ${array1}`)
    console.log(`initial array 2: ${array2}`)
    console.log(`initial array 3: ${array3}`)
    console.log(`initial array 4: ${array4}`)
    
    /**unshift() adds a new element to the beginning of an array and alters the length of the array*/
    // array1.unshift({ name: 'Kofi', gender: 'Male' })
    // console.log(array1)
    // array4.unshift('Pineapple')
    // console.log(array4)

    /**shift() removes the first element in the array and alters the length of that array */
    // array1.shift()
    // console.log(array1)
    // array2.shift()
    // console.log(array2)
    
    /**push() adds a new element to the end of an array and alters the length of the array */
    // array1.push({ pet: 'cat', gender: 'female' })
    // console.log(array1);
    // array4.push('newitem')
    // console.log(array4);

    /**pop() removes the last element in the array and alters the length of that array*/
    // array1.pop();
    // console.log(array1)
    // array2.pop()
    // console.log(array2)

    /**splice() removes an element at a specific postion from the array and alters the length of the array
    * it takes 2 args splice(index, deletecount)
    * index is the position index of the element u want to remove
    * deletecount is the number of elements to remove starting from the arg's index
    * if deletecount is 0, it means no elements will be removed
    * if deletecount is not specified or omitted, the elements from the arg's index to the end of the array are removed
    * if an element is added after these 2 params ie. (index, deletecount), the element added will replace the 
    * removed elements at those positions they were removed*/
    // array1.splice(1, 1)
    // console.log(array1)
    // array3.splice(1, 2)
    // console.log(array3);
    // array3.splice(1, 2, "new item", { name: 'sam', age: 12 })
    // console.log(array3);
    // array2.splice(1, 0)
    // console.log(array2)
    // array2.splice(1, 0, "hello")
    // console.log(array2)
    // array4.splice(1)
    // console.log(array4);
 
    /**concat() joins 2 or more arrays and returns a new array without changing the initial arrays*/
    // let newarray1 = array1.concat(array3)
    // console.log(newarray1)
    // let newarray2 = array2.concat(array4)
    // console.log(newarray2);
    // let newarray3 = array1.concat(array2)
    // console.log(newarray3);
    // let newarray4 = array1.concat(array2).concat(array3).concat(array4)
    // console.log(newarray4);

    /**reverse() reverses the order of the elements in the array */
    // array3.reverse()
    // console.log(array3)
    // array2.reverse()
    // console.log(array2);

    /**slice() selects elements from an array and returns them in a new array
    * takes 2 arguments
    * 1st argument is the index position of the element to start selecting from 
    * 2nd argument is the (value - 1) index position of the element to end at 
    */
    // let newarray5 = array1.slice(1, 3)
    // console.log(newarray5);

    /**sort() sorts the items in an array
    * does not work on object arrays 
    * sorting not effective when array contains strings and numbers */
    // array3.sort()
    // console.log(array3);
    // array2.sort()
    // console.log(array2)

    /**string() converts an array to a string separated by commas
    * the original array is not changed */
    // let newarray6 = array1.toString()
    // console.log(array1);
    // console.log(newarray6)
    // let newarray7 = array4.toString()
    // console.log(newarray7);



    return (
        <div>Sorry, this webpage does not exist.
        you were trying to reach componentB
        </div>
    )
}

export default ComponentD;