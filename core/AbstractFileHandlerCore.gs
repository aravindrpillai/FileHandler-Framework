package training.util.filehandler.core

uses java.io.File

/**
 * author : Aravind R Pillai
 * date   : 14 Nov 2022
 * desc   : Abstract class with the set of functions that needs to be overwritten in the child class
 */
abstract class AbstractFileHandlerCore extends FilesCore{

  protected abstract function speficyFilePath() : String;

  protected abstract function handleSuccess(file : File);

  protected abstract function handleFailure(file : File, e : Exception);

}