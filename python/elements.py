
class ElementWrapper():
    def __init__(self, element):
        if element == None:
            raise Exception("ElementWrapper: element cannot be None")
        self.element = element

    def getElement(self):
        return self.element
     
    def append(self, *others):
        for o in others:
            self.element.appendChild(o.element)
        return self
         
    def attr(self, name, value):
        self.element.setAttribute(name, value)
        return self
         
    def refresh(self):
        raise Exception("Needs to be implemented by sub-classes")
    
    def removeChilds(self):
        while self.element.hasChildNodes():
            self.element.removeChild(self.element.firstChild)
    
    def removeFromParent(self):
        self.element.parentNode.removeChild(self.element)

    def children(self):
        return Array.prototype.slice.call(self.element.children)

    def indexInParent(self):
        return self.children().indexOf(self.element)

    def insertBefore(self, newnode: 'ElementWrapper', existingnode: 'ElementWrapper'):
        return self.element.insertBefore(newnode.element, existingnode.element)

