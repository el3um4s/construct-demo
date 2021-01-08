// JSUnit.js
//
// version: 0.01
// 23 October 2000

// Copyright (c) 2000 Vadim Nareyko
// This module is free software; you can redistribute it and/or modify it.

// IN NO EVENT SHALL THE AUTHOR BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
// SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF
// THIS CODE, EVEN IF THE AUTHOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
// DAMAGE.
//
// THE AUTHOR SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
// PARTICULAR PURPOSE.  THE CODE PROVIDED HEREUNDER IS ON AN "AS IS" BASIS,
// AND THERE IS NO OBLIGATION WHATSOEVER TO PROVIDE MAINTENANCE,
// SUPPORT, UPDATES, ENHANCEMENTS, OR MODIFICATIONS.

function JSAssert_print() {
	var win=window.open("","_blank","width=400,height=300,toolbar=no,scrollbars=yes");
	win.document.writeln("<TITLE>JSUnit</TITLE><PRE>");
	win.document.writeln(""+this.count+" test(s): "+this.done+" ok, "+this.failed+" failed\n---");
	win.document.writeln(this.text);
	win.document.close();
}

function JSAssert_add(f, t) {
	this.count++;
	if(f) {
		if(this.printall) this.text+=t+": done\n";
		this.done++;
	} else {
		this.text+=t+": failed condition\n";
		this.failed++;
	}
}

function JSAssert(printall) {
	this.printall=printall;
	this.count=0;
	this.failed=0;
	this.done=0;
	this.text="";
	this.add=JSAssert_add;
	this.print=JSAssert_print;
}

function JSTestSuite_add(func) {
	eval("this.func"+this.count+"=func");
	this.count++;
}

function JSTestSuite_run(printall) {
	this.assert=new JSAssert(printall);
	for(var i=0;i<this.count;i++) eval("this.func"+i+"()");
	this.assert.print();
	this.assert=null;
}

function JSTestSuite() {
	this.assert=null;
	this.count=0;
	this.add=JSTestSuite_add;
	this.run=JSTestSuite_run;
}