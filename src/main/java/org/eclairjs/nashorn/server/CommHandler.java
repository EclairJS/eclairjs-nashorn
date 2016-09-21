package org.eclairjs.nashorn.server;


public interface CommHandler {
    public void open( CommWriter commWriter, String commId, String targetName, String data);
    public void close( CommWriter commWriter, String commId, String data);
}
