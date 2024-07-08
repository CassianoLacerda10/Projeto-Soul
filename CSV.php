<?php 

class readCSV {

    //atributes
    private $separator = '';
    private $fileName = '';

    //methods
    public function __construct($fileName, $separator) {
        $this->separator = $separator;
        $this->fileName = $fileName;
    }

    public function __get($attr) {
        return $this->$attr;
    }

    public function __set($attr, $value) {
        $this->$attr = $value;
    }

    //método responsável por retornar um array do arquivo .csv ordenado pelo nome do produto
    public function configCSV() {
        //Abrir o arquivo
        $csv = fopen($this->fileName, 'r');
        if (!$csv) {
            throw new Exception("Falha ao abrir o arquivo.");
        }

        //Ler o header do arquivo
        $header = fgetcsv($csv, 0, $this->separator);
        if (count($header) < 2) {
            throw new Exception("O delimitador fornecido parece estar incorreto.");
        }

        //Ler as linhas do arquivo
        $dados = [];
        while ($row = fgetcsv($csv, 0, $this->separator)) {
            $dados[] = $row;
        }

        //localizando qual indice é o nome e ordenando arrays filhos por ele
        if ($header[0] == 'nome') {
            usort($dados, function ($a, $b) {
                return strcmp($a[0], $b[0]);    
            });
        } else if ($header[1] == 'nome') {
            usort($dados, function ($a, $b) {
                return strcmp($a[1], $b[1]);    
            });
        } else if ($header[2] == 'nome') {
            usort($dados, function ($a, $b) {
                return strcmp($a[2], $b[2]);    
            });
        }

        fclose($csv);

        //Retornando os arrays $header e $dados em um único array
        return $planilha = [
            'header' => $header,
            'rows' => $dados
        ];
    }

    //transformando o array em um json
    public function arrayToJSON($parameter) {
        $json = json_encode($parameter, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        return $json;
    }
    
}
?>
