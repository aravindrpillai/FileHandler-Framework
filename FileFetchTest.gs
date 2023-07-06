package training.util.filehandler

uses training.util.filehandler.core.FileReaderBase
uses org.apache.log4j.Logger
uses java.io.File

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Child class to configure the properties for file handling
 */
class FileFetchTest extends FileReaderBase {

  private static final var _logger = Logger.getLogger(FileFetchTest)

  /**
   * Function to specify the file path here
   * @return
   */
  override function speficyFilePath() : String {
    return "C:/aravind/filehandler/processed/myfile.txt"
  }

  /**
   * Function to process the file.
   * NOTE - If this function returns NULL, processEachLine() will not be executed
   *        If no action needs to be done here on this function, you can simple skik this function from this class
   * @param file
   */
  override function processFile(file : File)  : File {
    print("inside file function : "+file.AbsolutePath)
    return file
  }

  /**
   * Function to process each line of file
   * NOTE - control will come here only if the processfile() returns a valid file
   * @param file
   */
  override function processEachLine(line : String, lineIndex:int) {
    print(lineIndex+" -- "+line)
  }

  /**
   * Function to handle the success
   * @param file
   */
  override function handleSuccess(file : File) {
    var moved = super.move(file, "C:/aravind/filehandler/processed/myfile.txt")
    if (moved) {
      _logger.info("Successfully Moved to new location")
    }
  }

  /**
   * function to handle the failure
   * NOTE - File may be NULL
   * @param file
   * @param e
   */
  override function handleFailure(file : File, e : Exception) {
    _logger.error("Failed to process : "+e.StackTraceAsString)
    if(file != null and file.exists()){
      super.delete(file)
    }
  }




}