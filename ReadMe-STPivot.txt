To deploy STPivot in your Pentaho BI Server, all you need to do is:

1. Copy folder "./stpivot" to your Pentaho's context (ie: ".../tomcat/webapps/pentaho/")

2. Edit Pentaho's web.xml (".../pentaho/WEB-INF/web.xml") to add lines containned in "./add-to-web.xml"

3. Restart Pentaho BI Server

4. Test if it works by going to: "http://localhost:8080/pentaho/STPivot?solution=steel-wheels&path=analysis&action=analysis_customers.analysisview.xaction"

In order to use STpivot instead of default Pivot viewer, you need to change the viewer in the Pivot component (in the .xaction), or construct an URL like in step 4.

STPivot is not meant to replace default's Pivot viewer in Pentaho since is has not yet implemented some important functions to the platform (like saving an analysis as *.xaction). It simply tries to enhance end user experience. Main features include:

. Ajax interface
. Use of jQuery to handle user interactions
. Highlighted MDX syntax in the editor
. Easier edition of charts (resizing with mouse, icons for options)
. New set of icons

Feel free to use STPivot and, please, give us feedback of your experience and possible enhancements.