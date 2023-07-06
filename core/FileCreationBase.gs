package training.util.filehandler.core

uses training.util.filehandler.helper.FileHandlerException
uses training.util.filehandler.helper.FieldsXMLReader
uses training.util.filehandler.dto.FieldPropertiesDTO
uses org.apache.log4j.Logger
uses java.io.File

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Base class to do the framework logic
 */
abstract class FileCreationBase extends AbstractFileHandlerCore {

  private static final var _logger = Logger.getLogger(FileCreationBase)
  private var _fieldProperties : List<FieldPropertiesDTO>
  private var _fieldCount : int = 0
  abstract function specifyFieldsXMLPath() : String;

  abstract function specifyFileContent() : List<List<Object>>;

  /**
   * function to start the process
   * this function takes the file content from "specifyFileContent()"
   */
  function start() {
    _logger.info("Starting to write content")
    var content = specifyFileContent()
    if(content == null or content.Count == 0){
      throw new FileHandlerException("Empty file content. " +
          "Either the fileContent must be passed to method start() or specifyFileContent() " +
          "must be overridden to return the content ")
    }
    start(content)
    _logger.info("File handling done.")
  }


  /**
   * Function to start the process with the list of file content
   * @param content
   */
  function start(content : List<List<Object>>) {
    var xmlPath = specifyFieldsXMLPath()
    _fieldProperties = new FieldsXMLReader().getFileDetails(xmlPath)
    var totalFieldsPerLine = _fieldProperties.Count
    _fieldCount = _fieldProperties.Count
    var path = speficyFilePath()
    var file : File
    try {
      var formattedContent = new StringBuilder()
      var formattedLine : String
      foreach (eachLineContent in content index i) {
        if(eachLineContent.Count != totalFieldsPerLine){
          throw new FileHandlerException("Line ${i+1} doesn't have enough items as per the XML. :- ${eachLineContent.toString()}")
        }
        formattedLine = formatEachLine(eachLineContent, i)
        print(formattedLine)
        formattedContent.append(formattedLine + "\n")
      }
      file = writeToFile(formattedContent, path)
      handleSuccess(file)
    } catch (e : Exception) {
      _logger.error("Failed to process the file: " + e.StackTraceAsString)
      handleFailure(file, e)
    }
  }

  /**
   * Function to format each line
   * @param lineContents
   * @param lineNumber
   * @return
   */
  private function formatEachLine(lineContents : List<Object>, lineNumber:int) : String {
    var lineContent = new StringBuilder()
    if(_fieldCount != lineContents.Count){
      throw new FileHandlerException("Line content ${lineNumber+1} doesnt have all the information. | Content:  ${lineContents.toString()}")
    }
    var itemAsString : String
    var fieldProperty : FieldPropertiesDTO
    var formattedLine : String
    var delimitor : String = null
    var lineContentCount = lineContents.Count
    var isLastLine = false
    var itemLength = 0
    var delimitorLength = 0
    foreach(item in lineContents index i){
      isLastLine = (lineContentCount-1 <= i)
      itemAsString = item?.toString()?.trim()
      fieldProperty = _fieldProperties.get(i)
      delimitor = (fieldProperty.Delimitor == "" and fieldProperty.Delimitor == null) ? null : fieldProperty.Delimitor.trim()
      delimitorLength = delimitor == null ? 0 : delimitor.length()
      itemLength = (itemAsString == null or itemAsString == "") ? 0 : itemAsString.length()

      if(itemLength == 0 and fieldProperty.Required){
          throw new FileHandlerException("Line ${lineNumber+1} - Field ${fieldProperty.FieldName} value is null")
      }
      if(fieldProperty.Responsive){
        if(delimitor == null){
          throw new FileHandlerException("Delimitor cannot be empty when the file content is responsive")
        }
        itemAsString = (itemAsString == null) ? "" : itemAsString
        lineContent.append(isLastLine ? itemAsString : itemAsString+fieldProperty.Delimitor)
      }else{
        itemLength = (itemLength+delimitorLength)
        if(itemLength > fieldProperty.FieldSize){
          if(fieldProperty.TrimValueIfExceedsSize){
            itemAsString = itemAsString.substring(0, (fieldProperty.FieldSize-delimitorLength))
          }else{
            throw new FileHandlerException("Line ${lineNumber} has item ${item} exceeding the max size specified for field ${fieldProperty.FieldName}")
          }
        }
        formattedLine = formatValue(itemAsString, fieldProperty.FieldSize, fieldProperty.Justify, delimitorLength)
        lineContent.append(isLastLine ? formattedLine : formattedLine+fieldProperty.Delimitor)
      }
    }
    return lineContent.toString()
  }


  /**
   * Function to format each value with spacing
   * @param value
   * @param size
   * @param justify
   * @param delimiterLength
   * @return
   */
  private function formatValue(value:String, size:int, justify:String, delimiterLength:int) : String {
    if(value == null or value == ""){
      return createSpace(size-delimiterLength)
    }else{
      var leftPadding = 0
      var rightPadding = 0
      var valueLength = value.length()
      if(justify == "right"){
        leftPadding = size-(value.length()+delimiterLength)
        rightPadding = 0
      }else if(justify == "center"){
        leftPadding = ((size-valueLength) % 2 ==0 ) ? ((size-valueLength) / 2) : ((size-valueLength-1) / 2)
        rightPadding = (((size-valueLength) % 2 ==0 ) ? ((size-valueLength) / 2) : ((size-valueLength+1) / 2))-delimiterLength
      }else{
        leftPadding = 0
        rightPadding = size-(value.length()+delimiterLength)
      }
      return createSpace(leftPadding)+value+createSpace(rightPadding)
    }
  }


  /**
   * function to generate the spaces
   * @param sCount
   * @return
   */
  private function createSpace(sCount: int) : String {
    if(sCount == 0){
      return ""
    }
    var sp = new StringBuilder()
    for(i in 0..|sCount){
      sp.append(" ")
    }
    return sp.toString()
  }

}