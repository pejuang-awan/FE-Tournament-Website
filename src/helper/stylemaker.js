export default function stylemaker(type, attributes){
    var style = "";
    for (let i = 0; i < attributes.length; i++) {
        style += "." + type + "-" + attributes[i] + " ";
    }
    return style.slice(0, style.length-1);
}