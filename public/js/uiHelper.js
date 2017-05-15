function toggleNav() {
    var e = document.getElementById("adminNavMain"),
        t = document.getElementById("showNav"),
        n = e.style.display;
    "" == n || "none" == n ? (e.style.display = "block", t.innerHTML = "<a href='#' onclick='toggleNav();'>- nav</a>") : "block" == n && (e.style.display = "none", t.innerHTML = "<a href='#' onclick='toggleNav();'>+ nav</a>")
}

function toggleNavSubSection(e) {
    var t = document.getElementById("adminNavMainSubSection" + e),
        n = document.getElementById("showNavSubSection" + e),
        a = t.style.display;
    "" == a || "none" == a ? (t.style.display = "block", n.innerHTML = " <a href='#' onclick='toggleNavSubSection(" + e + ");'>-</a>") : "block" == a && (t.style.display = "none", n.innerHTML = " <a href='#' onclick='toggleNavSubSection(" + e + ");'>+ </a>")
}

function toggleNavSubSectionOLD(e) {
    var t = document.getElementById(e),
        n = document.getElementById("showNavSubSection"),
        a = t.style.display;
    "" == a || "none" == a ? (t.style.display = "block", n.innerHTML = " <a href='#' onclick='toggleNavSubSection(id);'>-</a>") : "block" == a && (t.style.display = "none", n.innerHTML = " <a href='#' onclick='toggleNavSubSection(id);'>+ </a>")
}

function toggleDisplay(e) {
    "" == e.style.display || "none" == e.style.display ? e.style.display = "block" : e.style.display = "none"
}

function addAttributes(e, t) {
    for (var n = 0; n < t.length; n++) e.setAttribute(t[n].name, t[n].value)
}

function Attribute(e, t) {
    this.name = e, this.value = t
}

function SelectOption(e, t, n) {
    var n = "undefined" != typeof n && n;
    this.value = e, this.text = t, this.selected = n
}

function createInput(e, t, n, a) {
    var i = document.createElement("input");
    i.id = e, i.name = t, void 0 !== a && addAttributes(i, a), n.appendChild(i)
}

function createHiddenInput(e, t, n, a) {
    var i = new Array;
    i.push(new Attribute("type", "hidden")), i.push(new Attribute("value", n)), createInput(e, t, a, i)
}

function createSelect(e, t, n, a, i) {
    var o = document.createElement("select");
    o.id = e, o.name = t;
    for (var l = 0; l < n.length; l++) {
        var c = document.createElement("option");
        c.value = n[l].value, c.text = n[l].text, n[l].selected && c.setAttribute("selected", "selected"), o.appendChild(c)
    }
    addAttributes(o, i), a.appendChild(o)
}

function createDatalistInput(e, t, n, a, i, o) {
    var l = document.createElement("datalist");
    l.id = e;
    for (var c = 0; c < a.length; c++) {
        var r = document.createElement("option");
        r.value = a[c].value, l.appendChild(r)
    }
    i.appendChild(l);
    var d = document.createElement("input");
    d.id = t, d.name = n, d.setAttribute("type", "text"), addAttributes(d, o), i.appendChild(d)
}

function sendRequest(e, t, n) {
    var a = createXMLHTTPObject();
    if (a) {
        var i = n ? "POST" : "GET";
        a.open(i, e, !0), n && a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onreadystatechange = function() {
            4 == a.readyState && (200 != a.status && 304 != a.status || t(a))
        }, 4 != a.readyState && a.send(n)
    }
}

function createXMLHTTPObject() {
    for (var e = !1, t = 0; t < XMLHttpFactories.length; t++) {
        try {
            e = XMLHttpFactories[t]()
        } catch (e) {
            continue
        }
        break
    }
    return e
}
var XMLHttpFactories = [function() {
    return new XMLHttpRequest
}, function() {
    return new ActiveXObject("Msxml2.XMLHTTP")
}, function() {
    return new ActiveXObject("Msxml3.XMLHTTP")
}, function() {
    return new ActiveXObject("Microsoft.XMLHTTP")
}];
document.getElementById("scrollingTableContainer").addEventListener("scroll", function() {
    var e = "translate(0," + this.scrollTop + "px)";
    this.querySelector("thead").style.transform = e
});
//# sourceMappingURL=uiHelper.js.map