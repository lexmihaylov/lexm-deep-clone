## Modules

<dl>
<dt><a href="#module_deepClone">deepClone</a> ⇒ <code><a href="#DeepClone">DeepClone</a></code></dt>
<dd><p>lexm-deep-clone is a Polymer helper that helps you clone a custom element, it&#39;s child nodes and custom element attributes.
Also it provides a simple node filternig and mapping.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#DeepCloneOptions">DeepCloneOptions</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#DeepClone">DeepClone</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_deepClone"></a>

## deepClone ⇒ <code>[DeepClone](#DeepClone)</code>
lexm-deep-clone is a Polymer helper that helps you clone a custom element, it's child nodes and custom element attributes.
Also it provides a simple node filternig and mapping.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>Element</code> |  | the element that we want to clone |
| [opt] | <code>[DeepCloneOptions](#DeepCloneOptions)</code> | <code>DeepCloneOptions</code> | cloning options |

**Example**  
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
      var filteredCone = Polymer.deepClone(myElem, { 
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
<a name="DeepCloneOptions"></a>

## DeepCloneOptions : <code>Object</code>
**Kind**: global typedef  
**Note**: If you use both filter and map the order of execution will be: first `filter` then `map`  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| filter | <code>function</code> &#124; <code>undefined</code> | function that will be called on every node. |
| map | <code>function</code> &#124; <code>undefined</code> | function that will be called on every node. |

**Example**  
```js
// using filter
Polymer.deepClone(myNode, { 
     filter: function(node) { 
         return node.tagName === 'SPAN'
     }
});

// using map
Polymer.deepClone(myNode, { 
     map: function(node) { 
         if(node.tagName === 'DIV') { 
             return document.createElement('p');
         }

         return node;
     }
});

// using both filter and map
Polymer.deepClone(myNode, { 
     filter: function(node) { 
         return node.tagName === 'SPAN'
     },
     map: function(node) { 
         if(node.tagName === 'DIV') { 
             return document.createElement('p');
         }

         return node;
     }
});
```

* [DeepCloneOptions](#DeepCloneOptions) : <code>Object</code>
    * [.filter(node)](#DeepCloneOptions+filter) ⇒ <code>Boolean</code>
    * [.map(node)](#DeepCloneOptions+map) ⇒ <code>Element</code>

<a name="DeepCloneOptions+filter"></a>

### deepCloneOptions.filter(node) ⇒ <code>Boolean</code>
**Kind**: instance method of <code>[DeepCloneOptions](#DeepCloneOptions)</code>  
**Returns**: <code>Boolean</code> - if it's true this node wont be cloned and will not exist in the cloned element  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Element</code> | the processed node |

<a name="DeepCloneOptions+map"></a>

### deepCloneOptions.map(node) ⇒ <code>Element</code>
**Kind**: instance method of <code>[DeepCloneOptions](#DeepCloneOptions)</code>  
**Returns**: <code>Element</code> - the same element or a new element  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Element</code> | the processed node |

<a name="DeepClone"></a>

## DeepClone : <code>Object</code>
**Kind**: global typedef  

* [DeepClone](#DeepClone) : <code>Object</code>
    * [.node()](#DeepClone.node) ⇒ <code>Element</code>
    * [.childNodesTo(destNode)](#DeepClone.childNodesTo)

<a name="DeepClone.node"></a>

### DeepClone.node() ⇒ <code>Element</code>
Clones the node

**Kind**: static method of <code>[DeepClone](#DeepClone)</code>  
**Returns**: <code>Element</code> - the cloned element  
<a name="DeepClone.childNodesTo"></a>

### DeepClone.childNodesTo(destNode)
Clones all of the node's children to another element

**Kind**: static method of <code>[DeepClone](#DeepClone)</code>  

| Param | Type | Description |
| --- | --- | --- |
| destNode | <code>Element</code> | the destination node to clone all the |

