package training.util.filehandler.core

uses training.util.filehandler.helper.FileHandlerException
uses java.io.FileReader
uses java.io.File

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Base class to handle the process
 */
abstract class FileReaderBase extends AbstractFileHandlerCore {

  protected var _file : File as FILE

  /**
   * function to start the process
   */
  function start() {
    try {
      var path = speficyFilePath()
      _file = fetchFile(path)
      if(!_file.File or _file.Directory){
        throw new FileHandlerException("Invalid or Empty File")
      }
      _file = processFile(_file)
      if(_file != null){
        var lines = org.apache.commons.io.IOUtils.readLines(new FileReader(_file))
        foreach(line in lines index i){
          processEachLine(line, i)
        }
      }
      handleSuccess(_file)
    } catch (e : Exception) {
      handleFailure(_file, e)
    }
  }

  /**
   * fuction to handle the file
   * @param file
   * @return
   */
  function processFile(file : File) : File {
    return file
  }

  /**
   * Function to handle each line
   * @param line
   * @param lineIndex
   */
  function processEachLine(line : String, lineIndex:int) {
    return
  }
}