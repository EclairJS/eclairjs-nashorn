package org.eclairjs.nashorn.server;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.*;
import org.apache.log4j.*;
import org.apache.log4j.spi.LoggingEvent;

public class EclairjsLoggerAppender extends AppenderSkeleton{

    Layout layout;
    CommWriter commWriter;

    static Logger rootLogger=org.apache.log4j.Logger.getRootLogger();
    static Layout existingLayout;
    static {
        Object appender=rootLogger.getAllAppenders().nextElement();
        if (appender instanceof Appender)
            existingLayout=((Appender) appender).getLayout();
    }

    EclairjsLoggerAppender( Layout layout, CommWriter commWriter)
    {
        this.layout=layout;
        this.commWriter=commWriter;
    }


    public static void create(CommWriter commWriter,String logLevels)  {

        String levelsString;
        if (logLevels.startsWith("\"")&& logLevels.endsWith("\""))
            levelsString=logLevels.substring(1,logLevels.length()-1);
        else
            levelsString=logLevels;

        if (!levelsString.trim().isEmpty())
        {
            String [] packageLevels=levelsString.split("\\:");
            System.out.println("logLevels"+packageLevels.length);
            for ( String packageLevel : packageLevels) {
                String [] levels=packageLevel.split("@");
                if (levels.length==2)
                {

                    Level level=Level.toLevel(levels[1]);
                    System.out.println("set logging for "+levels[0]+" to "+level);
                    Logger.getLogger(levels[0]).setLevel(level);
                }
                else
                    System.out.println("bad Log level: "+packageLevel);
            }

        }

        PatternLayout layout= new PatternLayout("%d{yy/MM/dd HH:mm:ss} %p %c{3}: %m%n");
        EclairjsLoggerAppender appender=new EclairjsLoggerAppender(layout,commWriter);
        rootLogger.addAppender(appender);
    }


    @Override
    public void close() {
        commWriter.close();
    }

    @Override
    public boolean requiresLayout() {
        return true;
    }

    @Override
    protected void append(LoggingEvent loggingEvent) {
        String logLine=layout.format(loggingEvent);
//    System.out.println("LOGGER="+logLine)

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode jsObject = mapper.createObjectNode();
        jsObject.put("log", logLine);
        commWriter.writeMsg(jsObject);

    }
}
