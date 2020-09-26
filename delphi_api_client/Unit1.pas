unit Unit1;

interface

uses
  Winapi.Windows, Winapi.Messages, System.SysUtils, System.Variants, System.Classes, Vcl.Graphics,
  Vcl.Controls, Vcl.Forms, Vcl.Dialogs, System.JSON, System.Net.URLClient,
  System.Net.HttpClient, System.Net.HttpClientComponent, Vcl.StdCtrls;

type
  TForm1 = class(TForm)
    Button1: TButton;
    Edit1: TEdit;
    NetHTTPClient1: TNetHTTPClient;
    NetHTTPRequest1: TNetHTTPRequest;
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
var
 url, json_donus: string;
 param: TStringList;
 jsonObj: TJSONValue;
begin
 param := TStringList.Create;
 param.Add('lisansno='+Edit1.Text);
 url := 'https://apiservice.wolcod.com/api/lisans';
 json_donus := NetHTTPRequest1.Post(url, param).ContentAsString();
 jsonObj := TJSONObject.ParseJSONValue(json_donus);
 if jsonObj.TryGetValue('lisans_sahibi', jsonObj)  then
 begin
   ShowMessage('License Owner: ' + jsonObj.Value);
 end else
 begin
  ShowMessage('License Owner: ' + jsonObj.GetValue<string>('message'));
 end;
end;

end.
