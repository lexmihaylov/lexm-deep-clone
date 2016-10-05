# lexm-deep-clone

lexm-deep-clone is a Polymer helper the helps you clone a custom element, it's child nodes and custom element attributes. Also it provides a simple node filternig.

# Examples

```html
<my-custom-element id="myElem">
    <span>You can skip me!</span>
    <custom-child-element> Content </custom-child-element>
</my-custom-element>
 
<script>
    // clone a custom element
    var myElem = document.getElementById('myElem');
     
    var myElemClone = Polymer.deepClone(myElem).node();
    
    // clone element's children to another element
    var fragment = document.createElement('div');
    Polymer.deepClone(myElem).childNodesTo(fragment);
     
    // if we want to skip cloning of specific element
    var filteredClone = Polymer.deepClone(myElem, { 
        filter: function(node) { 
            return node.tagName === 'SPAN';
        }
    }).node();
     
    // output:
    // <my-custom-element id="myElem">
    //     <custom-child-element> Content </custom-child-element>
    // </my-custom-element>
      
</script>
```