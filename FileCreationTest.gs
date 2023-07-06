package training.util.filehandler

uses training.util.filehandler.core.FileCreationBase
uses org.apache.log4j.Logger
uses java.io.File

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Child class to configure the properties for file handling
 */
class FileCreationTest extends FileCreationBase {

  static final var _logger = Logger.getLogger(FileCreationTest)
  /**
   * specify the XML file path here
   * @return
   */
  function specifyFieldsXMLPath() : String {
    return ConfigurationFolder.concat("gsrc/integrations/util/filehandler/fields.xml")
  }

  /**
   * Function to specify the file path here
   * @return
   */
  override function speficyFilePath() : String {
    return "C:/aravind/filehandler/processing/myfile.txt"
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
   * NOTE - File may be null
   * @param file
   * @param e
   */
  protected override function handleFailure(file : File, e : Exception) {
    _logger.error("Failed to process : "+e.StackTraceAsString)
    if(file != null and file.exists()){
      super.delete(file)
    }
  }


  /**
   * function to specify the file content.
   * This is not a mandatory function.
   * If this function is specified - you can directly call start()
   * else you need to pass the file content as the parameter of "start" -Line start(List<List<Object>>)
   * @return
   */
  function specifyFileContent() : List<List<Object>> {
    return {
        {"Aravind", 19, 2345.99, "Sreerangam", null, "691306"},
        {"Deepu", 14, 2234, "House Number 2", "Street Name", "889900"},
        {"Sukanya V", 15, 3453, "Flat number F1", "Sabari Gardens", "785412"}
    }
  }
}