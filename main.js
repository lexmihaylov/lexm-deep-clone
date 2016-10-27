/**
 * 
 * lexm-deep-clone is a Polymer helper that helps you clone a custom element, it's child nodes and custom element attributes.
 * Also it provides a simple node filternig and mapping.
 * @module {function} deepClone
 * 
 * @param {Element} element the element that we want to clone
 * @param {DeepCloneOptions} [opt=DeepCloneOptions] cloning options
 * @returns {DeepClone}
 * 
 * @example
 * ```html
 *  <my-custom-element id="myElem">
 *      <span>You can skip me!</span>
 *      <custom-child-element> Content </custom-child-element>
 *  </my-custom-element>
 * 
 *  <script>
 *      // clone a custom element
 *      var myElem = document.getElementById('myElem');
 *      
 *      var myElemClone = Polymer.deepClone(myElem).node();
 * 
 *      // clone element's children to another element
 *      var fragment = document.createElement('div');
 *      Polymer.deepClone(myElem).childNodesTo(fragment);
 * 
 *       // if we want to skip cloning of specific element
 *       var filteredCone = Polymer.deepClone(myElem, { 
 *            filter: function(node) { 
 *              return node.tagName === 'SPAN';
 *            }
 *      }).node();
 * 
 *      // output:
 *      // <my-custom-element id="myElem">
 *      //     <custom-child-element> Content </custom-child-element>
 *      // </my-custom-element>
 *          
 *  </script>
 * ```
 */
(function() {
    'use strict';
    
    /**
     * clone elements and it's children
     * @param {Element} el
     * 
     * @return {Element} the cloned element
     */
    var cloneElement = function(el) {
        var clone = el.cloneNode();

        if(el.properties) for(var prop in el.properties) {
            try {
                clone[prop] = el[prop];
            } catch(e) { /* if the prop is readonly */ }
        }

        return clone;
    };

    /**
     * clone element child nodes to another node
     * @param {Element} src source element
     * @param {Element} dest destination element
     */
    var cloneChildNodes = function(src, /* into */dest, opt) {
        opt = opt || {};

        var nodes = src.childNodes;
        var currentNode;
        
        for(var i = 0; i < nodes.length; i++) {
            currentNode = nodes[i];
            if(opt.filter && opt.filter(nodes[i], i)) {
                continue;
            }
            
            if(opt.map) {
                currentNode = opt.map(nodes[i], i);
            }
            
            if(currentNode == nodes[i]) {
                var childClone = cloneElement(nodes[i]);
                if(nodes[i].childNodes.length > 0) {
                    cloneChildNodes(nodes[i], childClone, opt);
                }
            } else {
                childClone = currentNode;
            }

            dest.appendChild(childClone);
        }
    };
    
    /**
     * @typedef {Object} DeepCloneOptions
     * @global
     * @property {function|undefined} filter function that will be called on every node.
     * @property {function|undefined} map function that will be called on every node.
     * 
     * @note If you use both filter and map the order of execution will be: first `filter` then `map`
     * 
     * @example
     * // using filter
     * Polymer.deepClone(myNode, { 
     *      filter: function(node) { 
     *          return node.tagName === 'SPAN'
     *      }
     * });
     * 
     * // using map
     * Polymer.deepClone(myNode, { 
     *      map: function(node) { 
     *          if(node.tagName === 'DIV') { 
     *              return document.createElement('p');
     *          }
     * 
     *          return node;
     *      }
     * });
     * 
     * // using both filter and map
     * Polymer.deepClone(myNode, { 
     *      filter: function(node) { 
     *          return node.tagName === 'SPAN'
     *      },
     *      map: function(node) { 
     *          if(node.tagName === 'DIV') { 
     *              return document.createElement('p');
     *          }
     * 
     *          return node;
     *      }
     * });
     */
     
     /**
      * @name DeepCloneOptions#filter
      * @function
      * @param {Element} node the processed node
      * @returns {Boolean} if it's true this node wont be cloned and will not exist in the cloned element
      */
      
      /**
      * @name DeepCloneOptions#map
      * @function
      * @param {Element} node the processed node
      * @returns {Element} the same element or a new element
      */
     
     /**
      */
    Polymer.deepClone = function(el, opt) {
        /**
         * @typedef {Object} DeepClone
         * @global
         */
        return {
            /**
             * Clones the node
             * @memberof DeepClone
             * @returns {Element} the cloned element
             */
            node: function() {
                var clone = cloneElement(el);
                if(el.childNodes.length > 0) {
                    cloneChildNodes(el, clone, opt);
                }

                return clone;
            },
            /**
             * Clones all of the node's children to another element
             * @memberof DeepClone
             * @param destNode {Element} the destination node to clone all the 
             */
            childNodesTo: function(destNode) {
                cloneChildNodes(el, destNode, opt);
            }
        };
    };
}());