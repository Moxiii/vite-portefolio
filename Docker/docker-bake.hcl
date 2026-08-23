
group "default" {
    targets = [ "front" , "back" ]
}

target "front" {
  context    = "."
  dockerfile = "Docker/dockerfile.prod.front"
tags = ["portfolio-front:latest"]
}
target "back" {
  context    = "."
  dockerfile = "Docker/dockerfile.prod.api"
tags = ["portfolio-back:latest"]
}