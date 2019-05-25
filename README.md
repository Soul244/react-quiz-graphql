# React Quiz GraphQL

apollo-boost: Çok farklı ortamlarda kullanılabilen ve görebilidiğim kadarıyla en popüler olan Graphql kütüphanesi olduğu için bunu seçtim.

react-apollo: Apollo kütüphanesinin React tarafında kullanılması için geliştirilmiş kütüphane.

dotenv-webpack: Api ve key'i saklamak için bu kütüphaneyi kullandım. ".env" isimli bir dosya oluşturdum ve gizli tutulması gereken verileri burayı ekledim. Daha sonra bu dosyayı .gitignore içerisinde belirterek, Github'a yüklenmesini engelledim.

Proje'de olabildiğince yazılı olan koda dokunmadım. QuizApp component'ı içerisinde daha önceden oluşturmuş olduğum testimi çağırdım. Daha sonra bu testi child component'lara dağıttım. Önceden belirtilmiş, veritabanındaki isimlerle uyuşmayan birkaç property ismini değiştirdim (question>title, answer>content gibi). Uygulamada sorular her cevaplandığında slice methodu ile azaltılıyordu. Bunu değiştirmedim. Bu yüzden restartQuiz kısmında yedeklenmiş biçimde duran soruları tekrar atadım. 