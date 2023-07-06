package training.util.filehandler.core

uses java.io.File

uses org.apache.log4j.Logger

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Core class with basic file operations
 */
class FilesCore {

  private static final var _logger = Logger.getLogger(FilesCore)

  /**
   * Function to fetch a file from a location
   * @param fromFile
   * @param toLocation
   * @return
   */
  protected function fetchFile(filePath : String) : File {
    if (filePath == null or filePath == "") {
      throw new Exception("File Path cannot be empty")
    }
    var file = new File(filePath)
    return file
  }

  /**
   * Function to move a file to a different location
   * @param fromFile
   * @param toLocation
   * @return
   */
  protected function move(fromLocation : String, toLocation : String) : boolean {
    var source = new File(fromLocation)
    if(not source.exists()){
      throw new Exception("Source file doesnot exist :- "+fromLocation)
    }
    if(not source.File){
      throw new Exception("Specified source is not a file :- "+fromLocation)
    }
    return move(source, toLocation)
  }

  /**
   * Function to move a file to a different location
   * @param fromFile
   * @param toLocation
   * @return
   */
  protected function move(fromFile : File, toLocation : String) : boolean {
    try {
      var dest = new File(toLocation)
      if (dest.exists()) {
        dest.delete()
      }
      dest.ParentFile.mkdirs()
      var moved = fromFile.renameTo(dest);
      return moved
    } catch (e : Exception) {
      _logger.error("Failed to move file : "+e.StackTraceAsString)
      return false
    }
  }

  /**
   * Function to delete a file
   * @param file
   * @return
   */
  protected function delete(file : File) : boolean {
    if (file?.exists()) {
      return file.delete()
    }
    _logger.info("File to delete not found :- "+file?.AbsolutePath)
    return true
  }


  /**
   * Property to get the working folder
   *
   * @return
   */
  protected property get ConfigurationFolder() : String {
    var appFolder = System.getProperty("user.dir").replaceAll("\\\\", "/")
    return appFolder.concat("/modules/configuration/")
  }

  /**
   * Function to write content to a file
   * @param formatedContent
   * @return
   */
  function writeToFile(formatedContent : StringBuilder, filePath : String) : File {
    var file = fetchFile(filePath)
    if (file.exists()) {
      file.delete()
    }
    file.ParentFile.mkdirs()
    file.createNewFile()
    file.write(formatedContent.toString())
    return file
  }
}